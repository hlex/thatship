import React, { useState, useEffect, useContext } from "react";
import _ from 'lodash'
import anime from 'animejs'

import background from '../images/thatship-04.png'
import boat2 from '../images/boat2.png'
import iconEdit from '../images/icon_edit.png'
import iconDelete from '../images/icon_delete.png'

import { userContext } from '../lib'

const defaultAuthor = 'Author'
const defaultMessage = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab corrupti omnis rem maxime quo dolorum! Repellat, ut. Reprehenderit, enim sit'

export default ({ author = defaultAuthor, message = defaultMessage, onEdit, onDelete, onClose }) => {

  useEffect(() => {
    anime({
      targets: '.edit-paper',
      opacity: 1,
      duration: 300,
      easing: 'easeInOutQuad'
    })
  }, [])

  const handleDelete = () => {
    const result = window.confirm('Are you sure to delete ?')
    if (result) onDelete()
  }

  return (
    <div className={`edit-paper`} style={{ backgroundImage: `url(${background})` }}>
      <button className="app-icon" onClick={onClose}>
        <img src={boat2} alt="" />
      </button>
      <div className="text-container">
        <p className="message">{`"I regret to ${message}"`}</p>
        <p className="author">{author}</p>
      </div>
      <div className="action">
        <button className="button" onClick={onEdit}>
          <img src={iconEdit} alt="" />
          <span>Edit</span>
        </button>
        <button className="button" onClick={handleDelete}>
          <img src={iconDelete} alt="" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};
