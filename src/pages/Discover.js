import React, { useState, useEffect, useContext } from "react";
import _ from 'lodash'
import anime from 'animejs'

import { MainContent, BoatFlag, ConfessPaper, EditPaper } from "../components";

import Controller from "../webgl/Controller";
import Ocean from "../webgl/model/OceanModel";
import Boat from "../webgl/model/BoatModel";

import iconConfess from "../images/confess.png";
import iconSearch from "../images/search.png";

import { randomID } from "../webgl/utils";

import { appCategories, getCategoryColorCode } from '../utils'

import { userContext, firebase, storeContext } from '../lib'
import { resolve } from "uri-js";

const { UserContext } = userContext
const { StoreContext } = storeContext


let oceanModel
let currentFlag = {}
let editingBoat = {}
let boats = {}
let author = ""
let globalShowConfessPaper = false
let globalShowEditPaper = false

const sleep = (second) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true)
    }, second * 1000)
  })
}

const Discover = ({ history }) => {
  const [time, setTime] = useState(0)
  const [state, updateState] = useState({})
  const { getUserDisplayName, getUserEmail, isLoggedIn } = useContext(UserContext)
  const { store } = useContext(StoreContext)

  const { showConfessPaper, showEditPaper } = state

  console.debug('@Discover', { store, boats, size: _.size(_.keys(boats)) })

  useEffect(() => {
    const generateDemoBoats = async () => {
      const boats = [];
      for (const i in appCategories) {
        const category = appCategories[i]
        const boat = new Boat({
          id: randomID(),
          message: `${category.label}`,
          author: 'Anonymous',
          category: category.value,
          color: getCategoryColorCode(category.value)
        });
        boats.push(boat);
      }
      oceanModel.addBoats(boats);
    }

    // // the root model, all of the boats will be it's children
    oceanModel = new Ocean();

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

    // generateDemoBoats()
  }, []);

  useEffect(() => {
    const { boats: existingBoats } = store
    const boatsToLoad = []
    console.log('existingBoats', existingBoats)
    _.forEach(existingBoats, (existingBoat, boatId) => {
      const boat = new Boat({
        id: boatId,
        message: existingBoat.message,
        author: existingBoat.author,
        category: existingBoat.category,
        color: getCategoryColorCode(existingBoat.category)
      });
      if (existingBoat.author === 'Mondit Thumniramon') {
        boatsToLoad.push(boat)
      }
    })
    oceanModel.addBoats(boatsToLoad);
  }, [store.boats])

  const showFlag = () => !_.isEmpty(currentFlag.id)
  const getHoveringBoat = () => _.find(boats, boat => boat.id === currentFlag.id)

  const setState = (data) => {
    updateState({
      ...state,
      ...data
    })
  }

  const render = () => {
    setTime({ _t: Date.now() })
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
    console.log('handleAddBoat', boat)
    oceanModel.addBoat(boat)
  };

  const handleEditBoat = ({ id }) => {
    const targetBoat = _.find(boats, boat => boat.id === id)
    console.log('handleEditBoat', { id, targetBoat, author })
    if (targetBoat.author === author) {
      editingBoat = targetBoat
      handleOpenEditPaper()
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
    if (globalShowConfessPaper) return ''
    // console.log('hoverBoat', { id, position })
    if (currentFlag.id !== id) {
      currentFlag = {
        id,
        position
      }
      render()
    }
  }, 500);

  const handleSubmitRegret = async ({ message, category, isAnonymous }) => {
    const userEmail = getUserEmail()
    if (_.isEmpty(userEmail)) {
      console.log('Cannot submit regret because email is empty', userEmail)
      return ''
    }

    const boatId = randomID()
    const author = isAnonymous ? 'Anonymous' : getUserDisplayName()
    const confessMessage = {
      id: boatId,
      category,
      message,
      author,
      userId: userEmail
    }
    handleCloseConfessPaper()

    // show animation
    anime({
      targets: '.thankyou-popup',
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeInOutQuad',
        complete: () => {
          anime({
            targets: '.thankyou-popup',
            opacity: [1, 0],
            delay: 5000,
            duration: 500,
            easing: 'easeInOutQuad',
              complete: async () => {
                console.log('Complete !')
                handleAddBoat(confessMessage)
                // save boats to user profile in firestore
                await firebase.db.collection('boats').doc(boatId).set(confessMessage)
                await firebase.db.collection('users').doc(getUserEmail()).update({
                  boats: firebase.firestore.FieldValue.arrayUnion(boatId)
                })
              }
          })
        }
    })

  }

  const handleOpenConfessPaper = () => {
    if (isLoggedIn) {
      setState({
        showConfessPaper: true
      })
      globalShowConfessPaper = true
    } else {
      history.push('/login')
    }
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
        globalShowConfessPaper = false
      }
    })
  }

  const handleOpenEditPaper = () => {
    setState({
      showEditPaper: true
    })
    globalShowEditPaper = true
  }

  const handleCloseEditPaper = () => {

    anime({
      targets: '.edit-paper',
      opacity: 0,
      translateX: '-10%',
      duration: 300,
      easing: 'easeInOutQuad',
      complete: () => {
        setState({
          showEditPaper: false
        })
        globalShowEditPaper = false
      }
    })
  }

  const handleEditConfess = () => {

  }

  const handleDeleteConfess = async () => {
    const userId = getUserEmail()
    const boatId = editingBoat.id

    // remove boat from boats
    boats = _.omit(boats, [boatId])

    // remove boat from 3d
    handleRemoveBoat(editingBoat)

    await firebase.db.collection("boats").doc(boatId).delete()
    await firebase.db.collection("users").doc(userId).update({
      boats: firebase.firestore.FieldValue.arrayRemove(boatId)
    })

    console.log('Deleted !', editingBoat)

    handleCloseEditPaper()
  }

  // console.log('@Render', state)

  author = getUserDisplayName()

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
          <div className="edit-paper-container">
            {showEditPaper && (
              <EditPaper {...editingBoat} onEdit={handleEditConfess} onDelete={handleDeleteConfess} onClose={handleCloseEditPaper} />
            )}
          </div>
          <div className="thankyou-popup">
            <p className="title">THANK YOU!</p>
            <p>Take a moment with yourself to think about how you are living your life.</p>
            <p>Life is brief, and happiness is too fragile to carry the weight of regret.</p>
            <p>Let it sail away!</p>
          </div>
          <div id="ocean" />
        </MainContent>
      </div>
    </div>
  );
};

export default Discover;
