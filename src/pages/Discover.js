import React, { useState, useEffect } from "react";

import { MainContent } from "../components";

import Controller from "../webgl/Controller";
import Ocean from "../webgl/model/OceanModel";
import Boat from "../webgl/model/BoatModel";

import iconConfess from "../images/confess.png";
import iconSearch from "../images/search.png";

// import BoatFlag from '@/components/BoatFlag'
// import BoatEdit from '@/components/BoatEdit'
// import BoatCreate from '@/components/BoatCreate'

import { randomID } from "../webgl/utils";

let oceanModel


const Discover = () => {
  const [boats, setBoats] = useState({})
  let ocean = <div />
  useEffect(() => {
    // // the root model, all of the boats will be it's children
    // // oceanModel = new Ocean();
    ocean = new Ocean();
    oceanModel = ocean

    // renderer initialization will happen within the controller
    const oceanController = new Controller({
      model: oceanModel,
      container: "ocean"
    });

    // an example of using Observer
    // TODO transform event names into constants
    oceanModel.addObserver("BoatModelAdded", e => {
      console.log("BoatModelAdded");
      // addBoat()
      const nextBoats = Object.assign({}, boats, {
        [e.boat.id]: e.boat
      });
      setBoats(nextBoats)
    });

    oceanController.addObserver("BoatHover", data => hoverBoat(data));
    oceanController.addObserver("BoatSelect", e => {
      this.selectedId = e.id;
      this.isEditMode = true;
    });
    oceanController.addObserver("ClearHover", () => clearHover());
    // oceanController.addObserver('UpdateFlagPosition', position => this.hovered.position = position);

    //sample boat. Further communication with boats will occur via ID
    const boat = new Boat({
      id: randomID(),
      message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      author: 'Author 1'
    });
    // run the internal method of the ocean model
    oceanModel.addBoat(boat);
  }, []);

  const handleAddBoat = data => {
    console.log('handleAddBoat', data)
    // sample boat. Further communication with boats will occur via ID
    const boat = new Boat({
      id: randomID(),
      message: data.message,
      author: data.author
    })
    oceanModel.addBoat(boat)
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
  return (
    <div className="discover-page">
      <div className="container">
        <MainContent>
          {/* <button className="test-button" onClick={handleAddBoat}>Add Boat</button> */}
          <div className="menu">
            <div className="menu-item">
              <img src={iconConfess} alt="" />
              <h4>confess a regret</h4>
            </div>
            <div className="menu-item">
              <img src={iconSearch} alt="" />
              <h4>search for regrets</h4>
            </div>
          </div>
          <div id="ocean">{ocean}</div>
        </MainContent>
      </div>
    </div>
  );
};

export default Discover;
