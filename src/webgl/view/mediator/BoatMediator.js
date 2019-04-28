import Observer from "../../Observer";
import * as THREE from "three-full";
import convert from 'color-convert';
import { clamp } from '../../utils';
import { MTLLoader, OBJLoader } from "three-obj-mtl-loader";

const InstancedMesh = require('three-instanced-mesh')(THREE);
const mtlLoader = new MTLLoader();
const objLoader = new OBJLoader();

//Safari fix
window.ImageBitmap =
  window.ImageBitmap ||
  function () {
    return null;
  };

const vs3D = `
  attribute vec3 idcolor;
  varying vec3 vidcolor;
  void main(){
  vidcolor = idcolor;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0);
  }
`;

const fs3D = `
  varying vec3 vidcolor;
  void main(void) {
    gl_FragColor = vec4(vidcolor,1.0);
  }
`;

const _v3 = new THREE.Vector3();
const _q = new THREE.Quaternion();

const pointOnPlane = new THREE.Vector3();
const triangle = new THREE.Triangle();
const closestPoint = new THREE.Vector3();
const target = new THREE.Vector3();

export default class BoatMediator extends Observer {
  constructor() {
    super();

    this.loaded = false;
    this.object3D = new THREE.Object3D();

    // original mesh
    this.loadedMesh = null;

    // GPUPicker material
    this.pickingMaterial = new THREE.ShaderMaterial({
      vertexShader: vs3D,
      fragmentShader: fs3D,
      transparent: false,
      side: THREE.DoubleSide
    });

    // GPUPicker objects
    this.pickingObjects = [];
    this.positionsTaken = [];

  }

  setColor(model) {
    const object = this.pickingObjects.find(a => a.userData.modelRef === model.id);
    if (model.new) {
      const mesh = this.object3D.children.find(a => a.id === object.userData.pickerRef);
      if (mesh) {
        mesh.material.color.lerp(this.getRGB(model.color), 1);
        mesh.material.needsUpdate = true;
      }
    } else {
      this.object3D.setColorAt(object.userData.index, this.getRGB(model.color));
      this.object3D.needsUpdate('color');
    }
  }

  getRGB(hex) {
    const [r, g, b] = convert.hex.rgb(hex);
    return new THREE.Color(`rgb(${r}, ${g}, ${b})`);
  }

  hideObject(modelId) {
    const pickerObject = this.pickingObjects.find(a => a.userData.modelRef === modelId);
    const mesh = this.object3D.children.find(a => a.id === pickerObject.userData.pickerRef);

    pickerObject.visible = false;

    if (mesh) {
      mesh.visible = false;
      mesh.scale.set(0, 0, 0);

    } else {
      this.object3D.setScaleAt(pickerObject.userData.index, _v3.set(0, 0, 0));
      this.object3D.needsUpdate('scale');
    }
  }

  async buildBoat(data) {
    const master = this.loadedMesh || await this.load();
    const mesh = new THREE.Mesh(master.geometry.clone(), master.material.clone());
    const position = this.findPlaceRecursively();
    let pickerObject;

    if (position) {
      this.positionsTaken.push(position);
      // inst geometry
      mesh.scale.set(4, 4, 4);
      mesh.material.color.lerp(this.getRGB(data.color), 1);
      mesh.position.copy(position);

      // GPUPicker
      const geometry = mesh.geometry.clone();
      const positions = geometry.attributes["position"].array;
      const idColor = new Float32Array(positions.length);
      const color = new THREE.Color();
      const pickerId = mesh.id;
      color.setHex(pickerId);

      for (let j = 0; j < positions.length; j += 3) {
        idColor[j] = color.r;
        idColor[j + 1] = color.g;
        idColor[j + 2] = color.b;
      }
      geometry.addAttribute('idcolor', new THREE.BufferAttribute(idColor, 3));

      pickerObject = new THREE.Mesh(geometry, this.pickingMaterial);
      pickerObject.scale.set(4, 4, 4);
      pickerObject.position.copy(position);
      pickerObject.userData.modelRef = data.id;
      pickerObject.userData.pickerRef = pickerId;

      this.pickingObjects.push(pickerObject);
      this.object3D.add(mesh);
      return { boatMesh: mesh, pickingObjects: [pickerObject] };
    }

  }

  async buildGeometry(arr) {
    // build
    const mesh = this.loadedMesh || await this.load();
    //the instance group
    const cluster = new InstancedMesh(
      mesh.geometry.clone().clone(),
      mesh.material,
      arr.length,                 //instance count
      false,                      //is it dynamic
      true,                       //does it have color
      true,                       //uniform scale, if you know that the placement function will not do a non-uniform scale, this will optimize the shader
    );

    // build instanced geomentry + picker object
    for (let i = 0; i < arr.length; i++) {
      const position = this.findPlaceRecursively(0, arr.length);

      if (position) {
        // inst geometry
        this.positionsTaken.push(position);
        cluster.setQuaternionAt(i, _q);
        cluster.setPositionAt(i, _v3.copy(position));
        cluster.setScaleAt(i, _v3.set(4, 4, 4));
        cluster.setColorAt(i, this.getRGB(arr[i].color));

        // GPUPicker
        const m = mesh.clone();
        const geometry = m.geometry.clone();
        const positions = geometry.attributes["position"].array;
        const idColor = new Float32Array(positions.length);
        const color = new THREE.Color();
        const pickerId = m.id;
        color.setHex(pickerId);

        for (let j = 0; j < positions.length; j += 3) {
          idColor[j] = color.r;
          idColor[j + 1] = color.g;
          idColor[j + 2] = color.b;
        }
        geometry.addAttribute('idcolor', new THREE.BufferAttribute(idColor, 3));

        const pickerObject = new THREE.Mesh(geometry, this.pickingMaterial);
        pickerObject.scale.set(4, 4, 4);
        pickerObject.position.copy(position);
        pickerObject.userData.modelRef = arr[i].id;
        pickerObject.userData.pickerRef = pickerId;
        pickerObject.userData.index = i;
        // pickerObject.userData.originalPosition = position;

        this.pickingObjects.push(pickerObject);
      }
    }

    this.object3D = cluster;

    return { boatsCluster: cluster, pickingObjects: this.pickingObjects };
  }

  findPlaceRecursively(iteration = 0, amount = 0) {
    const k = clamp(10 * amount, 1000, 3000);

    const position = new THREE.Vector3(
      (Math.random() - 0.5) * k,
      0,
      (Math.random() - 0.5) * k
    );

    let distances = [];

    for (let i = 0; i < this.positionsTaken.length; i++) {
      const pos2 = this.positionsTaken[i];
      const distance = Math.hypot(position.x - pos2.x, position.z - pos2.z);
      distances.push(distance);
    }

    iteration++;

    if (!this.positionsTaken.length || !distances.some(x => x < 50)) {
      // console.log("iteration count", iteration);
      return position;
    } else if (iteration > 1000) {
      console.log("can not find a place", iteration);
      return new THREE.Vector3();
    } else {
      return this.findPlaceRecursively(iteration, amount);
    }
  }

  load() {
    const onProgress = xhr => {
      if (xhr.lengthComputable) {
        const percentComplete = (xhr.loaded / xhr.total) * 100;
        console.log(Math.round(percentComplete, 2) + "% downloaded");
      }
    };
    const onError = err => { };

    return new Promise((resolve, reject) => {
      mtlLoader
        .setTexturePath("/Paper_Boat_obj/")
        .load("/Paper_Boat_obj/untitled.mtl", materials => {
          materials.preload();

          objLoader
            .setMaterials(materials)
            .setPath(/Paper_Boat_obj/)
            .load(
              "untitled.obj",
              object => {
                object.traverse(child => {
                  // Mesh is not instanceof THREE.Mesh !?
                  if (child.type === "Mesh") {
                    // and more than that, the opacity was set to 0:
                    child.material.opacity = 1;

                    object = child;
                  }
                });
                object.name = "boat mesh";

                // cache
                this.loadedMesh = object;
                this.loaded = true;

                resolve(object);
              },
              onProgress,
              onError
            );
        });
    })

  }

  onAfterRender(wavesGeometry) {
    if (!this.loaded) return;

    for (let i = 0; i < this.object3D.numInstances; i++) {

      pointOnPlane.copy(this.object3D.getPositionAt(i));

      this.computeClosestPoint(wavesGeometry);

      this.object3D.setPositionAt(i, closestPoint);
      this.object3D.needsUpdate('position');
      this.pickingObjects[i].position.copy(closestPoint);
    }

    for (let i = 0; i < this.object3D.children.length; i++) {
      const object = this.object3D.children[i];

      pointOnPlane.copy(object.position);
      this.computeClosestPoint(wavesGeometry);

      object.position.copy(closestPoint);
      this.pickingObjects.find(a => a.userData.pickerRef === object.id).position.copy(closestPoint);
    }
  }

  computeClosestPoint(wavesGeometry) {
    const index = wavesGeometry.index;
    const position = wavesGeometry.attributes.position;

    let minDistance = Infinity;

    for (let j = 0, l = index.count; j < l; j += 3) {
      let a = index.getX(j);
      let b = index.getX(j + 1);
      let c = index.getX(j + 2);

      triangle.a.fromBufferAttribute(position, a);
      triangle.b.fromBufferAttribute(position, b);
      triangle.c.fromBufferAttribute(position, c);

      triangle.closestPointToPoint(pointOnPlane, target);
      let distanceSq = pointOnPlane.distanceToSquared(target);

      if (distanceSq < minDistance) {
        closestPoint.copy(target);
        minDistance = distanceSq;
      }
    }
  }
}