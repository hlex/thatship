// import * as THREE from "three";
import * as THREE from "three-full";
import OceanMediator from "./mediator/OceanMediator";
import ObjectPicker from "../view/ObjectPicker";

export default class Renderer {
  constructor({ controller, model }) {
    this.controller = controller;

    // scene, camera lights, etc
    this.ctx = this.createRenderingContext();

    // ocean mediator, the way to update components
    this.rootMediator = new OceanMediator(model, this.ctx);
    this.objectPicker = new ObjectPicker(this.rootMediator, this.ctx);

  }

  createRenderingContext() {
    const width = window.innerWidth,
      height = window.innerHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 1000);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      preserveDrawingBuffer: true,
      antialias: true
    });

    // const controls = new THREE.OrbitControls( camera );
    const controls = new THREE.MapControls(camera, renderer.domElement);
    // an animation loop is required when either damping or auto-rotation are enabled
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.minDistance = camera.far / 5;
    controls.maxDistance = camera.far / 2;
    controls.maxPolarAngle = Math.PI / 2.3;

    camera.position.set(150, 0, 300);
    // camera.position.set(75, 50, 50);

    renderer.setSize(width, height);
    renderer.localClippingEnabled = true;
    renderer.sortObjects = false;

    scene.add(new THREE.AmbientLight(0x333333));

    const light = new THREE.DirectionalLight(0xffffff, 1);

    light.position.set(15, 15, 15);
    scene.add(light);

    scene.fog = new THREE.Fog(0x111111);

    return { scene, camera, renderer, controls };
  }

  initialize(onAfterInit) {
    const scene = this.ctx.scene;
    const object3D = this.rootMediator.object3D;

    scene.add(object3D);

    this.objectPicker.initialize();
    this.objectPicker.addObserver("click", e =>
      this.controller.onClick(e.object)
    );
    this.objectPicker.addObserver("mousemove", e =>
      this.controller.onMouseMove(e.object)
    );

    window.addEventListener("resize", () => this.onWindowResize(), false);

    this.render();

    onAfterInit(this.ctx);
  }

  worldToScreen({ point3d, cssFormat, offsetX, offsetY }) {
    const vector = new THREE.Vector3().copy(point3d);
    const hw = this.ctx.renderer.domElement.width / 2;
    const hh = this.ctx.renderer.domElement.height / 2;

    vector.project(this.ctx.camera);

    vector.x = vector.x * hw + hw;
    vector.y = -(vector.y * hh) + hh;

    let coord = { x: vector.x, y: vector.y };

    if (offsetX) {
      coord.x += offsetX;
    }
    if (offsetY) {
      coord.y += offsetY;
    }
    if (cssFormat) {
      coord = {
        left: Math.round(coord.x) + "px",
        top: Math.round(coord.y) + "px"
      };
    }

    return coord;
  }

  render() {
    // only required if controls.enableDamping = true, or if controls.autoRotate = true
    this.ctx.controls.update();

    requestAnimationFrame(() => this.render());

    this.ctx.renderer.setRenderTarget(null);
    this.ctx.renderer.render(this.ctx.scene, this.ctx.camera);
    this.rootMediator.onAfterRender();
  }

  onWindowResize() {
    this.ctx.camera.aspect = window.innerWidth / window.innerHeight;
    this.ctx.camera.updateProjectionMatrix();
    this.ctx.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
