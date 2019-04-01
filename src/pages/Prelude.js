import React, { Fragment, useState, useEffect } from "react";
import anime from "animejs";
import { Link } from 'react-router-dom'

import { AppLogo } from "../components";

import boat from "../images/boat.png";
import iconScope from "../images/icon_scope.png";
import iconPaper from "../images/icon_paper.png";
import iconPlus from "../images/icon_plus.png";

const maxScene = 4;
const sceneDuration = 200
const boatSwingSpeed = 1000
const textAnimationDuration = 200

const Prelude = ({ onEnded }) => {
  const [state, setState] = useState(0);
  const [isBoatAnimated, setBoatAnimated] = useState(false)

  useEffect(() => {
    if (!isBoatAnimated) {
      animateBoat();
      setBoatAnimated(true)
    }
    if (state === 4) {
      animateSelection()
    } else {
      animateText()
    }
  });

  const manageState = () => {
    if (state < maxScene) {
      setState(state + 1);
    } else {
      onEnded()
    }
  };

  const animateSelection = () => {
    anime({
      targets: ".choice-container > .choice-item",
      opacity: [0, 1],
      delay: (el, i, l) => i * 100,
      easing: "easeInOutSine",
      duration: textAnimationDuration,
      complete: (anim) => {
        manageState()
      }
    });
  }

  const animateText = () => {
    anime({
      targets: ".text-container > p",
      opacity: [0, 1],
      delay: (el, i, l) => i * 100,
      easing: "easeInOutSine",
      duration: textAnimationDuration,
      complete: (anim) => {
        setTimeout(() => {
          anime({
            targets: ".text-container > p",
            opacity: [1, 0],
            delay: (el, i, l) => i * 100,
            easing: "easeInOutSine",
            duration: textAnimationDuration,
            complete: (anim) => {
              setTimeout(() => {
                manageState()
              })
            }
          });
        }, sceneDuration)
      }
    });
  };

  const animateBoat = () => {
    anime({
      targets: "#prelude-boat",
      translateX: [-25, 25],
      direction: "alternate",
      loop: true,
      easing: "easeInOutSine",
      duration: boatSwingSpeed
    });
  };

  const getTexts = () => {
    let textDOM = "";
    switch (state) {
      case 0:
        textDOM = (
          <Fragment>
            <p>We live our lives and time sails by, taking with it</p>
            <p>opportunities, moments, uncountable potential futures that</p>
            <p>never came to be. Chances missed and roads not taken weigh</p>
            <p>down our memories and we carry these with us each day.</p>
          </Fragment>
        );
        break;
      case 1:
        textDOM = (
          <Fragment>
            <p>But what if we could let them go? Send them out on waves on </p>
            <p>anonymity, their sails billowed and pushed with a sigh of</p>
            <p>relief. Our little ships of regret leaving us forever, </p>
            <p>helping us move on.</p>
          </Fragment>
        );
        break;
      case 2:
        textDOM = (
          <Fragment>
            <p>Life is brief, and happiness is too</p>
            <p>fragile to carry the weight of regret.</p>
            <p>Let it sail away.</p>
          </Fragment>
        );
        break;
      case 3:
        textDOM = (
          <Fragment>
            <AppLogo />
          </Fragment>
        );
        break;
      case 4:
        textDOM = (
          <div className="choice-container">
            <Link to="/login" className="choice-item">
              <div className="img-icon">
                <img src={iconPaper} alt="" />
                <img className="addon" src={iconPlus} alt="" />
              </div>
              <h4>confess a regret</h4>
            </Link>
            <Link to="/discover" className="choice-item">
              <div className="img-icon">
                <img src={iconScope} alt="" />
              </div>
              <h4>explore all regrets</h4>
            </Link>
          </div>
        );
        break;
      default:
        break;
    }
    return <div className="text-container">{textDOM}</div>;
  };

  return (
    <div className="prelude-page">
      <div className="container">
        <div className="content">
          <img id="prelude-boat" src={boat} alt="" />
          {getTexts()}
        </div>
      </div>
    </div>
  );
};

export default Prelude;
