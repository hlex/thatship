import React from 'react'
import _ from 'lodash'

import {
  AppLogo,
  Category,
  Avatar
} from './'

import iconWheel from '../images/wheel.png'
import iconMe from '../images/me.png'

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
            <p>Confess your Regret and sail it away!</p>
          </div>
          <div className={`category-list ${showCategory ? 'show' : ''}`}>
            <Category />
          </div>
          <div className={`user-zone ${isLoggedIn ? 'show' : ''}`}>
            {renderAvatar()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header