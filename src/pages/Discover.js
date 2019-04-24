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

import { appCategories, getCategoryColorCode } from '../utils'

import { userContext } from '../lib'
import { resolve } from "uri-js";

const { UserContext } = userContext

let oceanModel
let currentFlag = {}
let editingBoat = {}
let boats = {}
let author = ""

const sleep = (second) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true)
    }, second * 1000)
  })
}

const Discover = () => {
  const [state, setState] = useState({})
  const { getUserDisplayName } = useContext(UserContext)

  let ocean = <div />
  useEffect(() => {

    const generateDemoBoats = async () => {
      const boats = [];
      for (const i in appCategories) {
        console.log('Start Import Boat')
        const category = appCategories[i]
        const boat = new Boat({
          id: randomID(),
          message: `${category.label}`,
          author: 'Author 1',
          category: category.value,
          color: getCategoryColorCode(category.value)
        });
        // await sleep(0.2)
        boats.push(boat);
      }

      oceanModel.addBoats(boats);
    }

    // // the root model, all of the boats will be it's children
    // // oceanModel = new Ocean();
    ocean = new Ocean();
    oceanModel = ocean

    // renderer initialization will happen within the controller
    const oceanController = new Controller({
      model: oceanModel,
      container: "ocean"
    });

    oceanModel.addObserver("BoatsAdded", e => {
      boats = _.assign({}, boats, e.boats);
    });
    oceanModel.addObserver("SingleBoatAdded", e => {
      boats = _.assign({}, boats, [e.boat]);
    });

    oceanController.addObserver("BoatHover", data => hoverBoat(data)); // eslint-disable-line
    oceanController.addObserver("BoatSelect", e => { // eslint-disable-line
      console.log('BoatSelect', e)
      handleEditBoat(e)
    });
    oceanController.addObserver("ClearHover", () => clearHover()); // eslint-disable-line

    generateDemoBoats()
  }, []);

  const showFlag = () => !_.isEmpty(currentFlag.id)
  const getHoveringBoat = () => _.find(boats, boat => boat.id === currentFlag.id)

  const render = () => {
    setState({ _t: Date.now() })
  }

  const handleAddBoat = data => {
    console.log('handleAddBoat', data)
    const boat = new Boat({
      id: randomID(),
      category: data.category,
      message: data.message,
      author: data.author,
      color: getCategoryColorCode(data.category),
      new: true
    })
    oceanModel.addBoat(boat)
  };

  const handleEditBoat = ({ id }) => {
    const targetBoat = _.find(boats, boat => boat.id === id)
    console.log('handleEditBoat', { id, targetBoat, author })
    if (targetBoat.author === author) {
      editingBoat.id = id
      render()
    } else {
      alert('Can edit only your own boat.')
    }
  };

  const handleUpdateBoat = boatModel => {
    // for example
    const randomCat = appCategories[Math.floor(Math.random() * appCategories.length)];

    boatModel = _.assign({}, boatModel, {
      category: randomCat,
      color: getCategoryColorCode(randomCat.value)
    });
    
    oceanModel.updateBoat(boatModel);
  };

  const handleRemoveBoat = boatModel => {
    oceanModel.removeBoat(boatModel);
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
          render()
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
      render()
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

  // console.log('@Render', { user: getUserDisplayName(), currentFlag, hoveringBoat: getHoveringBoat(), editingBoat })

  author = getUserDisplayName()

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
          {showFlag() && (
            <BoatFlag
              boat={getHoveringBoat()}
              position={currentFlag.position || {}}
            />
          )}
          <div className="confess-paper-container">
            {showConfessPaper && (
              <ConfessPaper
                onSubmit={handleSubmitRegret}
                onClose={handleCloseConfessPaper}
              />
            )}
          </div>
          <div id="ocean" />
        </MainContent>
      </div>
    </div>
  );
};

export default Discover;
