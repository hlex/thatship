import React, { useEffect, useRef } from 'react'
import anime from 'animejs'
import ReactTooltip from 'react-tooltip'

import iconConfess from "../images/confess.png";

export default ({ onSubmit, onClose }) => {
  const node = useRef();
  const searchRef = useRef()

  useEffect(() => {
    anime({
      targets: '.search-input',
      opacity: 1,
      translateY: 10,
      duration: 500,
      easing: 'easeInOutQuad'
    })
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [])

  const handleClick = e => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    onClose()
  };

  const handleSubmit = () => {
    onSubmit(searchRef.current.value)
  }

  const handleKeyDown = (event) => {
    if (event.which === 13) handleSubmit()
  }

  return (
    <div className={`search-input`} ref={node}>
      <input ref={searchRef} placeholder="SEARCH ..." onKeyDown={handleKeyDown} />
      <button data-tip data-for='search-button' onClick={handleSubmit}><img src={iconConfess} alt="" /></button>
      <ReactTooltip id="search-button" place="top" type="dark" effect="solid">
        Click to search
      </ReactTooltip>
    </div>
  )
}