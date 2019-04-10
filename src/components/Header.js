import React from 'react'
import _ from 'lodash'

import {
  AppLogo,
  Category,
  Avatar
} from './'

import iconMe from '../images/me.png'
import iconCompass from '../images/navigate.png';

const Header = ({ isLoggedIn, user, userLogout, location, showCategory = true }) => {

  const handleLogout = () => {
    const confirmLogout = window.confirm("Do you want to logout ?");
    console.log('confirmLogout', confirmLogout)
    if (confirmLogout) userLogout()
  }

  const renderAvatar = () => {
    if (isLoggedIn) return <Avatar src={user.imageProfile} onClick={handleLogout} />
    return <img src={iconMe} alt="" />
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
            <Category />
          </div>
          <div className="compass">
          </div>
          <div className={`user-zone ${isLoggedIn ? 'show' : ''}`}>
            <img src={iconCompass} alt="" />
            {renderAvatar()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header