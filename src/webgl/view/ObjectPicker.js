import * as THREE from "three-full";
import Observer from "../Observer";

const pixelBuffer = new Uint8Array(4);

export default class ObjectPicker extends Observer {
  constructor(mediator, renderingContext) {
    super();
    // OceanMediator
    this.mediator = mediator;
    this.renderingContext = renderingContext;
    this.prevIntersection = null;

    this.pickingScene = new THREE.Scene();
    this.selectionObjects = {};

    this.mediator.addObserver('GeometryAdded', e => this.setTargets(e.pickingObjects));
  }

  setTargets(objects) {
    for (let i = 0; i < objects.length; i++) {
      this.pickingScene.add(objects[i]);
    }
  }

  initialize() {
    this.targets = [];
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    // const renderer = this.renderingContext.renderer;
    const pickingTexture = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
    pickingTexture.texture.minFilter = THREE.LinearFilter;
    this.pickingTexture = pickingTexture;

    const canvas = this.renderingContext.renderer.domElement;

    canvas.addEventListener("click", e => this.onClick(e));
    canvas.addEventListener("mousemove", e => this.onMouseMove(e));
  }

  onClick(e) {
    const object = this.getIntersection(e);
    this.emit('click', { object: object });
  }

  onMouseMove(e) {
    const object = this.getIntersection(e);
    this.emit('mousemove', { object: object });
  }

  getIntersection(e) {
    const x = e.x;
    const y = e.y;
    const ctx = this.renderingContext;
    ctx.renderer.setRenderTarget(this.pickingTexture);
    ctx.renderer.render(this.pickingScene, ctx.camera);
    ctx.renderer.readRenderTargetPixels(this.pickingTexture, x, this.pickingTexture.height - y, 1, 1, pixelBuffer);
    
    const id = (pixelBuffer[0] << 16) | (pixelBuffer[1] << 8) | (pixelBuffer[2]);

    let intersection = null;

    if (id > 0) {
       //this is the id of the picked object
      intersection = this.pickingScene.children.find(a => a.userData.pickerRef === id);
    }

    return intersection;
  }
}
