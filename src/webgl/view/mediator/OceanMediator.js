import * as THREE from "three";
import Observer from "../../Observer";
import MediatorFactory from "../../MediatorFactory";

const SEPARATION = 50,
  AMOUNTX = 50,
  AMOUNTY = 50;
let count = 0;

const pointOnPlane = new THREE.Vector3();
const triangle = new THREE.Triangle();
const closestPoint = new THREE.Vector3();
const target = new THREE.Vector3();

export default class OceanMediator extends Observer {
  constructor(model) {
    super();

    this.model = model;
    this.particles = this.createWaves();
    this.object3D = new THREE.Object3D();
    this.object3D.name = model.name;

    this.object3D.add(this.particles);
    this.position = new THREE.Vector3();

    this.childMediators = new Map();

    // Subscribe to a business-model(ocean) changes for updates
    this.model.addObserver("BoatModelAdded", e => {
      // console.log(e.boat);
      this.addChild(e.boat);
    });
  }

  async addChild(child) {
    const findPosition = (iteration = 0) => {
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 1000,
        0,
        (Math.random() - 0.5) * 1000
      );

      let distances = [];

      for (const boatMediator of this.childMediators.values()) {
        const pos2 = boatMediator.object3D.position;

        const distance = Math.hypot(position.x - pos2.x, position.z - pos2.z);
        distances.push(distance);
      }

      iteration++;

      if (!this.childMediators.size || !distances.some(x => x < 50)) {
        console.log("iteration count", iteration);
        return position;
      } else if (iteration > 1000) {
        console.log("can not find a place", iteration);
        return new THREE.Vector3();
      } else {
        return findPosition(iteration);
      }
    };

    const position = findPosition();

    const mediator = MediatorFactory.getMediator(child);
    this.childMediators.set(child, mediator);

    const object3D = await mediator.buildObject3D(position);

    // create ref to a mediator
    object3D.userData.mediator = mediator;

    this.object3D.add(object3D);

    this.emit("BoatAddedToOcean", { object3D });
  }

  onAfterRender() {
    const particles = this.particles;

    const positions = particles.geometry.attributes.position.array;
    const scales = particles.geometry.attributes.scale.array;
    let i = 0,
      j = 0;
    const sMod = 2;
    const pMod = 10;
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        positions[i + 1] =
          Math.sin((ix + count) * 0.3) * pMod +
          Math.sin((iy + count) * 0.5) * pMod;
        scales[j] =
          (Math.sin((ix + count) * 0.3) + 1) * sMod +
          (Math.sin((iy + count) * 0.5) + 1) * sMod;
        i += 3;
        j++;
      }
    }
    particles.geometry.attributes.position.needsUpdate = true;
    particles.geometry.attributes.scale.needsUpdate = true;
    count += 0.1;

    const geometry = particles.geometry;
    const index = geometry.index;
    const position = geometry.attributes.position;

    for (const boatMediator of this.childMediators.values()) {
      // console.log(boatMediator);
      pointOnPlane.copy(boatMediator.object3D.position);

      let minDistance = Infinity;

      for (let i = 0, l = index.count; i < l; i += 3) {
        let a = index.getX(i);
        let b = index.getX(i + 1);
        let c = index.getX(i + 2);

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

      boatMediator.onAfterRender(closestPoint);
    }
  }

  createWaves() {
    const vertexshader = `attribute float scale;
			void main() {
				vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
				gl_PointSize = scale * ( 300.0 / - mvPosition.z );
				gl_Position = projectionMatrix * mvPosition;
			}`;
    const fragmentshader = `uniform vec3 color;
			void main() {
				if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;
				gl_FragColor = vec4( color, 1.0 );
			}`;

    let particles;

    const numParticles = AMOUNTX * AMOUNTY;
    const positions = new Float32Array(numParticles * 3);
    const scales = new Float32Array(numParticles);
    let i = 0,
      j = 0;
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        positions[i] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2; // x
        positions[i + 1] = 0; // y
        positions[i + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2; // z
        scales[j] = 1;
        i += 3;
        j++;
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.addAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.addAttribute("scale", new THREE.BufferAttribute(scales, 1));

    const indices = Array.from(
      Array(geometry.attributes.position.count),
      (x, i) => i
    );
    geometry.setIndex(new THREE.BufferAttribute(new Uint16Array(indices), 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        color: {
          value: new THREE.Color(0xffffff)
        }
      },
      vertexShader: vertexshader,
      fragmentShader: fragmentshader
    });

    particles = new THREE.Points(geometry, material);

    // console.log(particles);

    return particles;

    // return new THREE.Mesh(
    //     new THREE.BoxGeometry(10, 10, 10),
    //     new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    // );
  }
}
