import React, { useState } from "react";
import _ from 'lodash'

import { Category } from "./";

const numberOfWhiteSpace = 11

export default ({ onClose = () => null }) => {
  const [message, setMessage] = useState(_.padStart('', numberOfWhiteSpace))
  const [selectedCategory, setCategory] = useState("");

  const handleSelectCategory = value => {
    setCategory(value);
  };

  const handleChangeMessage = (event) => {
    const message = event.target.value
    if (_.size(message) > numberOfWhiteSpace - 1) {
      setMessage(event.target.value)
    }
  }

  return (
    <div className="confess-paper">
      <div className="close-button">
        <button onClick={onClose}>
          <i className="fas fa-times" />
        </button>
      </div>
      <div className="message">
        <div className="note-container">
          <p className="prefix">I regret</p>
          <textarea
            resize={false}
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
          nSelect={handleSelectCategory}
        />
      </div>
      <div className="author-container">
        <p className="author">Minnie C.</p>
        <div className="input-checkbox">
          <input type="checkbox" />
          <span>Remain Anonymous</span>
        </div>
      </div>
    </div>
  );
};
