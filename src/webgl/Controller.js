import * as dat from "dat.gui";

import Renderer from "./view/Renderer";
import Observer from "./Observer";
/**
 * The controller from MVC pattern. Binds together the business logic(models) and views
 * user input(three.js ray casting) also goes here
 */
export default class Controller extends Observer {
  constructor({ model, container }) {
    super();

    this.model = model;
    this.view = new Renderer({ controller: this, model });
    this.gui = false;

    this.view.initialize(ctx => {
      if (this.gui) {
        if (window.gui) {
          window.gui.destroy();
        }
        const gui = (window.gui = new dat.GUI());

        const camera = gui.addFolder("camera");
        camera.add(ctx.camera.position, "x", 0, 1000).step(5);
        camera.add(ctx.camera.position, "y", 0, 1000).step(5);
        camera.add(ctx.camera.position, "z", 0, 1000).step(5);
        camera.open();
      }

      document.getElementById(container).appendChild(ctx.renderer.domElement);
    });
  }

  // DOM operations
  onClick(object) {
    if(object) {
      this.emit("BoatSelect", {
        id: object.userData.modelRef
      });
    }
  }

  onMouseMove(object) {
    if (object) {
      this.emit("BoatHover", {
        id: object.userData.modelRef,
        position: this.view.worldToScreen({
          point3d: object.position,
          cssFormat: true,
          offsetY: -100
        })
      });
    } else {
      this.emit("ClearHover");
    }
  }
}
