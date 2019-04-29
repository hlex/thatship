import React, { useState, useEffect, useContext } from "react";
import _ from 'lodash'
import anime from 'animejs'

import background from '../images/thatship-04.png'
import boat2 from '../images/boat2.png'
import iconEdit from '../images/icon_edit.png'
import iconDelete from '../images/icon_delete.png'

import { userContext } from '../lib'

export default ({ author = 'Author', message = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab corrupti omnis rem maxime quo dolorum! Repellat, ut. Reprehenderit, enim sit' }) => {

  useEffect(() => {
    // anime({
    //   targets: '.confess-paper',
    //   opacity: 1,
    //   duration: 300,
    //   easing: 'easeInOutQuad'
    // })
  }, [])

  const handleEdit = () => {
    console.log('handleEdit')
  }

  const handleDelete = () => {
    console.log('handleDelete')
  }

  return (
    <div className={`edit-paper`} style={{ backgroundImage: `url(${background})` }}>
      <div className="app-icon">
        <img src={boat2} alt="" />
      </div>
      <div className="text-container">
        <p className="message">{`"I regret to ${message}"`}</p>
        <p className="author">{author}</p>
      </div>
      <div className="action">
        <button className="button">
          <img src={iconEdit} alt="" />
          <span>Edit</span>
        </button>
        <button className="button">
          <img src={iconDelete} alt="" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};
