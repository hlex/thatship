import Observer from "../../Observer";
import * as THREE from "three/src/Three";

import { MTLLoader, OBJLoader } from "three-obj-mtl-loader";

const mtlLoader = new MTLLoader();
const objLoader = new OBJLoader();

//Safari fix
window.ImageBitmap =
  window.ImageBitmap ||
  function() {
    return null;
  };

export default class BoatMediator extends Observer {
  constructor(model) {
    super();

    this.model = model;
    this.loaded = false;

    this.object3D = new THREE.Object3D();
    this.object3D.userData.interactive = true;
    this.object3D.name = model.name;
    this.cachedModel = null;

    this.buildObject3D = async position => {
      try {
        const result = await this.buildBoat();

        this.object3D.children[0].material.color.lerp(
          new THREE.Color(0xffffff * Math.random()),
          0.5
        );
        this.object3D.position.copy(position);
        this.loaded = true;

        return result;
      } catch (e) {
        console.log(e);
      }
    };
  }

  buildBoat() {
    const onProgress = xhr => {
      if (xhr.lengthComputable) {
        const percentComplete = (xhr.loaded / xhr.total) * 100;
        console.log(Math.round(percentComplete, 2) + "% downloaded");
      }
    };

    return new Promise((resolve, reject) => {
      if (this.cachedModel) {
        this.object3D.add(this.cachedModel.clone());

        resolve(this.object3D);
      } else {
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

                  object.scale.set(4, 4, 4);
                  object.name = "boat mesh";

                  this.cachedModel = object;
                  this.object3D.add(object);

                  resolve(this.object3D);
                },
                onProgress,
                reject
              );
          });
      }
    });
  }

  onAfterRender(position) {
    if (!this.loaded) return;

    this.object3D.position.copy(position);
  }
}
