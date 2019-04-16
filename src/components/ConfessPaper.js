import React, { useState, useEffect, useContext } from "react";
import _ from 'lodash'
import anime from 'animejs'

import { Category } from "./";

import boat2 from '../images/boat2.png'

import { userContext } from '../lib'

const { UserContext } = userContext

const numberOfWhiteSpace = 11

export default ({ onSubmit = () => null, onClose = () => null }) => {

  const { getUserDisplayName } = useContext(UserContext)

  const [message, setMessage] = useState(_.padStart('', numberOfWhiteSpace))
  const [selectedCategory, setCategory] = useState("");
  const [isAnonymous, setAnonymous] = useState(false)

  useEffect(() => {
    anime({
      targets: '.confess-paper',
      opacity: 1,
      duration: 300,
      easing: 'easeInOutQuad'
    })
  })

  const handleSelectCategory = value => {
    setCategory(value);
  };

  const handleChangeMessage = (event) => {
    const message = event.target.value
    if (_.size(message) > numberOfWhiteSpace - 1) {
      setMessage(event.target.value)
    }
  }

  const handleSubmit = () => {
    if (!isReadyToSail()) {
      alert('Your regret is not complete. Try again !')
      return
    }
    onSubmit({
      message,
      category: selectedCategory,
      isAnonymous
    })
  }

  const toggleAnonymous = () => {
    setAnonymous(!isAnonymous)
  }

  const isReadyToSail = () => {
    return !_.isEmpty(selectedCategory) && _.size(message) > numberOfWhiteSpace
  }

  return (
    <div className="confess-paper">
      <button className="close-button" onClick={onClose}>
        <i className="fas fa-times" />
      </button>
      <div className="message">
        <div className="note-container">
          <p className="prefix">I regret</p>
          <textarea
            rows={4}
            className="notes"
            value={message}
            onChange={handleChangeMessage}
          />
        </div>
      </div>
      <div className="category-container">
        <p className="title">
          {`Underline the regrest's category`}
          <span className="required">*</span>
        </p>
        <Category
          theme="dark"
          activeCategory={selectedCategory}
          onSelect={handleSelectCategory}
        />
      </div>
      <div className={`author-container ${isAnonymous ? 'anonymous' : ''}`}>
        <p className="author">{getUserDisplayName()}</p>
        <div className="input-checkbox" onClick={toggleAnonymous}>
          <label>Remain Anonymous</label>
          <input type="checkbox" checked={isAnonymous ? 'checked' : ''} />
          <span />
        </div>
      </div>
      <button className="submit-button" onClick={handleSubmit}>
        <img src={boat2} alt="" />
        <h4 className={`text ${isReadyToSail() ? 'show' : ''}`}>Sail it !</h4>
      </button>
    </div>
  );
};
