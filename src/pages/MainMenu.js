import React, { useState, useEffect } from 'react'
import anime from "animejs";
import { Link } from 'react-router-dom'

import { Ocean } from '../components'

import boat from "../images/boat.png";
import iconConfess from "../images/confess_big.png"
import iconSearch from "../images/search_big.png"
// import iconScope from "../images/icon_scope.png";
// import iconPaper from "../images/icon_paper.png";
// import iconPlus from "../images/icon_plus.png";

const textAnimationDuration = 200

const MainMenu = () => {

  const [state, setState] = useState('init')

  useEffect(() => {
    if (state === 'init') animate()
  })

  const animate = () => {
    animateBoat()
    animateSelection()
  }

  const animateBoat = () => {
    anime({
      targets: "#prelude-boat",
      opacity: [0, 1],
      translateY: ['-50%', '0'],
      easing: "easeInOutSine",
      duration: 1000
    });
  };

  const animateSelection = () => {
    anime({
      targets: ".choice-container > .choice-item",
      opacity: [0, 1],
      delay: (el, i, l) => i * 100,
      easing: "easeInOutSine",
      duration: textAnimationDuration,
      complete: (anim) => {
        setState('ready')
      }
    });
  }

  return (
    <div className="main-menu-page">
      <img id="prelude-boat" src={boat} alt="" />
      <div className="choice-container">
        <Link to="/login" className="choice-item">
          <div className="img-icon">
            <img src={iconConfess} alt="" />
          </div>
          <h4>confess a regret</h4>
        </Link>
        <Link to="/discover" className="choice-item">
          <div className="img-icon">
            <img src={iconSearch} alt="" />
          </div>
          <h4>explore all regrets</h4>
        </Link>
      </div>
      {/* <Ocean /> */}
    </div>
  )
}

export default MainMenu