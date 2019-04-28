import * as THREE from "three";
import { TweenMax, Power4 } from "gsap";

import Observer from "../../Observer";
import BoatMediator from './BoatMediator';

const SEPARATION = 50,
  AMOUNTX = 75,
  AMOUNTY = 75;

export default class OceanMediator extends Observer {
  constructor(model, ctx) {
    super();

    this.count = 0;
    // Ocean Model
    this.model = model;
    this.ctx = ctx;

    this.particles = this.createWaves();

    this.object3D = new THREE.Object3D();
    this.object3D.name = model.name;
    this.object3D.add(this.particles);

    this.boatMediator = new BoatMediator();

    this.model.addObserver('BoatRemoved', e => this.boatMediator.hideObject(e.id));
    this.model.addObserver('UpdateBoatCategory', e => this.boatMediator.setColor(e.model));
    this.model.addObserver('SingleBoatAdded', e => this.addBoat(e.boat));
    this.model.addObserver('BoatsAdded', e => this.addBoatsCluster(e.boats));
  }

  async addBoat(boat) {
    const { boatMesh, pickingObjects } = await this.boatMediator.buildBoat(boat);
    const newPos = boatMesh.position;

    this.emit('GeometryAdded', { pickingObjects});

    TweenMax.to(this.ctx.controls.target, 1.5, {
      x: newPos.x,
      y: newPos.y,
      z: newPos.z,
      ease: Power4.easeInOut,
      delay: 0.5,
      // onUpdate: () => {
      //   this.ctx.camera.updateProjectionMatrix();
      //   this.ctx.camera.lookAt(newPos);
      // }
    });
  }
  
  async addBoatsCluster(boats) {
    const { boatsCluster, pickingObjects } = await this.boatMediator.buildGeometry(boats);

    if (boatsCluster && pickingObjects) {
      this.object3D.add(boatsCluster);
      // boatsCluster.needsUpdate('position');
      this.emit('GeometryAdded', { pickingObjects });
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

    return particles;
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
          Math.sin((ix + this.count) * 0.3) * pMod +
          Math.sin((iy + this.count) * 0.5) * pMod;
        scales[j] =
          (Math.sin((ix + this.count) * 0.3) + 1) * sMod +
          (Math.sin((iy + this.count) * 0.5) + 1) * sMod;
        i += 3;
        j++;
      }
    }
    particles.geometry.attributes.position.needsUpdate = true;
    particles.geometry.attributes.scale.needsUpdate = true;
    this.count += 0.05;

    this.boatMediator.onAfterRender(particles.geometry);
  }
}
