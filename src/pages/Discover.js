import React, { useState, useEffect, useContext } from "react";
import _ from 'lodash'
import anime from 'animejs'

import { MainContent, BoatFlag, ConfessPaper } from "../components";

import Controller from "../webgl/Controller";
import Ocean from "../webgl/model/OceanModel";
import Boat from "../webgl/model/BoatModel";

import iconConfess from "../images/confess.png";
import iconSearch from "../images/search.png";

import { randomID } from "../webgl/utils";

import { userContext } from '../lib'

const { UserContext } = userContext

let oceanModel
let currentFlag = {}
let boats = {}

const Discover = () => {
  const [state, setState] = useState({})
  const { getUserDisplayName } = useContext(UserContext)

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
      boats = _.assign({}, boats, {
        [e.boat.id]: e.boat
      });
    });

    oceanController.addObserver("BoatHover", data => hoverBoat(data));
    oceanController.addObserver("BoatSelect", e => {
      console.log('BoatSelect', e)
      // this.selectedId = e.id;
      // this.isEditMode = true;
    });
    oceanController.addObserver("ClearHover", () => clearHover());
    // oceanController.addObserver('UpdateFlagPosition', position => this.hovered.position = position);

    //sample boat. Further communication with boats will occur via ID
    // const boat = new Boat({
    //   id: randomID(),
    //   message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    //   author: 'Author 1'
    // });
    // run the internal method of the ocean model
    // oceanModel.addBoat(boat);
  }, []);

  const showFlag = () => !_.isEmpty(currentFlag.id)
  const getHoveringBoat = () => _.find(boats, boat => boat.id === currentFlag.id)

  const handleAddBoat = data => {
    console.log('handleAddBoat', data)
    // sample boat. Further communication with boats will occur via ID
    const boat = new Boat({
      id: randomID(),
      category: data.category,
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

  const clearHover = _.throttle(() => {
    const hoveringBoat = _.find(boats, boat => boat.id === currentFlag.id)
    // console.log('clearHover', { currentFlag, boats, hoveringBoat, isEmptyHoveringBoat: !_.isEmpty(hoveringBoat) })
    if (!_.isEmpty(hoveringBoat)) {
      anime({
        targets: '.boat-flag',
        opacity: 0,
        width: 0,
        duration: 1000,
        easing: 'easeInOutQuad',
        complete: () => {
          currentFlag = {}
          setState({ _t: Date.now() })
        }
      })
    }
  }, 2500);
  const hoverBoat = _.throttle(({ id, position }) => {
    // console.log('hoverBoat', { id, position })
    if (currentFlag.id !== id) {
      currentFlag = {
        id,
        position
      }
      setState({ _t: Date.now() })
    }
  }, 500);

  const handleSubmitRegret = ({ message, category, isAnonymous }) => {
    const author = isAnonymous ? 'Anonymous' : getUserDisplayName()
    const confessMessage = {
      id: randomID(),
      category,
      message: `I regret ${message}`,
      author
    }
    handleCloseConfessPaper()
    handleAddBoat(confessMessage)
  }

  const handleOpenConfessPaper = () => {
    setState({
      showConfessPaper: true
    })
  }
  const handleCloseConfessPaper = () => {

    anime({
      targets: '.confess-paper',
      opacity: 0,
      translateX: '-10%',
      duration: 300,
      easing: 'easeInOutQuad',
      complete: () => {
        setState({
          showConfessPaper: false
        })
      }
    })

  }

  console.log('@Render', currentFlag, getHoveringBoat())

  const { showConfessPaper } = state

  return (
    <div className="discover-page">
      <div className="container">
        <MainContent>
          <div className="menu">
            <div className="menu-item" onClick={handleOpenConfessPaper}>
              <img src={iconConfess} alt="" />
              <h4>confess a regret</h4>
            </div>
            <div className="menu-item">
              <img src={iconSearch} alt="" />
              <h4>search for regrets</h4>
            </div>
          </div>
          {showFlag() && <BoatFlag content={getHoveringBoat()} position={currentFlag.position || {}} />}
          <div className="confess-paper-container">
            {showConfessPaper && <ConfessPaper onSubmit={handleSubmitRegret} onClose={handleCloseConfessPaper} />}
          </div>
          <div id="ocean">{ocean}</div>
        </MainContent>
      </div>
    </div>
  );
};

export default Discover;
