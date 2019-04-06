import React, { useEffect } from "react";

import { MainContent } from "../components";

import Controller from "../webgl/Controller";
import Ocean from "../webgl/model/OceanModel";
import Boat from "../webgl/model/BoatModel";

// import BoatFlag from '@/components/BoatFlag'
// import BoatEdit from '@/components/BoatEdit'
// import BoatCreate from '@/components/BoatCreate'

import { randomID } from "../webgl/utils";

const Discover = () => {
  let oceanModel = <div />
  useEffect(() => {
    // the root model, all of the boats will be it's children
    oceanModel = new Ocean();

    // renderer initialization will happen within the controller
    const oceanController = new Controller({
      model: oceanModel,
      container: "ocean"
    });

    // an example of using Observer
    // TODO transform event names into constants
    oceanModel.addObserver("BoatModelAdded", e => {
      console.log("BoatModelAdded");
      this.boats = Object.assign({}, this.boats, {
        [e.boat.id]: e.boat
      });
    });

    oceanController.addObserver("BoatHover", data => this.hoverBoat(data));
    oceanController.addObserver("BoatSelect", e => {
      this.selectedId = e.id;
      this.isEditMode = true;
    });
    oceanController.addObserver("ClearHover", () => this.clearHover());
    // oceanController.addObserver('UpdateFlagPosition', position => this.hovered.position = position);

    //sample boat. Further communication with boats will occur via ID
    const boat = new Boat({
      id: randomID(),
      message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      author: "Author 1"
    });

    // run the internal method of the ocean model
    // oceanModel.addBoat(boat);
  }, []);

  const addBoat = data => {
    // this.ocean.addBoat(
    //   new Boat({
    //     id: randomID(),
    //     message: data.message,
    //     author: data.author
    //   })
    // );
    // this.isCreateMode = false;
  };
  const editBoat = data => {
    // this.boats[this.selectedId] = Object.assign(
    //   this.boats[this.selectedId],
    //   data
    // );
    // this.isEditMode = false;
    // this.selectedId = null;
  };
  const clearHover = forced => {
    // if (
    //   forced ||
    //   (this.currentFlagId && !this.boats[this.currentFlagId].showing)
    // ) {
    //   // console.log('clear');
    //   this.currentFlagId = null;
    // }
  };
  const hoverBoat = ({ id, position }) => {
    // if (this.currentFlagId !== id) {
    //   // console.log('show');
    //   this.currentFlagId = id;
    //   this.boats[id].position = position;
    //   this.boats[id].showing = true;
    // }
  };

  console.log('oceanModel', oceanModel)

  return (
    <div className="discover-page">
      <div className="container">
        <MainContent>
          <div id="ocean">{oceanModel}</div>
        </MainContent>
      </div>
    </div>
  );
};

export default Discover;
