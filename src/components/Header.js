import React, { useContext } from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'

import {
  AppLogo,
  Category,
  Avatar
} from './'

import iconMe from '../images/me.png'
import iconCompass from '../images/navigate.png';

import { storeContext } from '../lib'

const { StoreContext } = storeContext

const Header = ({ isLoggedIn, user, userLogout, location, showCategory = true }) => {

  const { activeCategory, setStore } = useContext(StoreContext)

  const handleLogout = () => {
    const confirmLogout = window.confirm("Do you want to logout ?");
    console.log('confirmLogout', confirmLogout)
    if (confirmLogout) userLogout()
  }

  const handleSelectCategory = (categoryValue) => {
    setStore({ activeCategory: categoryValue })
  }

  const renderAvatar = () => {
    if (isLoggedIn) return <Avatar src={user.imageProfile} onClick={handleLogout} />
    return <Link to="/login"><img src={iconMe} alt="" /></Link>
  }

  return (
    <div className="header fixed-top">
      <div className="container">
        <div className="content">
          <div className="title">
            <AppLogo />
            <p className="bold">Confess your Regret and sail it away!</p>
          </div>
          <div className={`category-list ${showCategory ? 'show' : ''}`}>
            <Category activeCategory={activeCategory} onSelect={handleSelectCategory} />
          </div>
          <div className="compass">
          </div>
          <div className={`user-zone show`}>
            <img src={iconCompass} alt="" />
            {renderAvatar()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header