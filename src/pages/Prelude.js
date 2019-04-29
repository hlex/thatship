import React, { Fragment, useState, useEffect } from "react";
import _ from 'lodash'
import anime from "animejs";

import { AppLogo, Ocean } from "../components";

import boat from "../images/boat.png";

const maxScene = 3;
const sceneDuration = 2000
const boatSwingSpeed = 0
const textAnimationDuration = 300

const getSceneDuration = (sceneNo) => {
  const map = {
    0: 4000,
    1: sceneDuration,
    2: sceneDuration,
    3: sceneDuration
  }
  return map[sceneNo]
}

const Prelude = ({ history }) => {
  const [state, setState] = useState(0);

  useEffect(() => {
    animateBoat();
  }, []);

  useEffect(() => {
    if (state <= maxScene) animateText()
  }, [state])


  const manageState = () => {
    if (state < maxScene) {
      setState(state + 1);
    } else {
      history.push('/menu')
    }
  };

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
              }, getSceneDuration(state))
            }
          });
        }, getSceneDuration(state))
      }
    });
  };

  const animateBoat = () => {
    anime({
      targets: "#prelude-boat",
      // translateX: [-25, 25],
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
