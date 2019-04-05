import * as THREE from "three";

import Observer from "../Observer";

export default class ObjectPicker extends Observer {
  constructor(mediator, renderingContext) {
    super();
    this.mediator = mediator;
    this.renderingContext = renderingContext;
    this.prevIntersection = null;
  }

  addTarget(object) {
    this.targets.push(object);
  }

  initialize() {
    this.targets = [];
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    const canvas = this.renderingContext.renderer.domElement;

    canvas.addEventListener("click", e => this.onClick(e));
    canvas.addEventListener("mousemove", e => this.onMouseMove(e));
  }

  onClick(e) {
    const intersection = this.getIntersection(e);
    let object = null;

    if (intersection && intersection.object.parent) {
      object = intersection.object.parent;
      this.emit("click", { object });
    }
  }

  onMouseMove(e) {
    const intersection = this.getIntersection(e);

    let object = null;

    if (intersection && intersection.object.parent) {
      object = intersection.object.parent;
    }
    this.emit("mousemove", { object });
  }

  getIntersection(e) {
    let x = e.offsetX;
    let y = e.offsetY;
    const canvas = this.renderingContext.renderer.domElement;

    this.mouse.x = (x / canvas.width) * 2 - 1;
    this.mouse.y = -(y / canvas.height) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.renderingContext.camera);

    const intersection = this.raycaster.intersectObjects(this.targets, true)[0];

    return intersection;
  }
}
