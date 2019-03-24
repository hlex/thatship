import React from 'react'

import Category from './Category'

import appLogo from '../images/logo.png'
import iconMe from '../images/me.png'

const Header = () => {
  return (
    <div className="header">
      <div className="title">
        <img src={appLogo} alt="logo" />
        <p>Confess your Regret and sail it away!</p>
      </div>
      <div className="category-list">
        <Category />
      </div>
      <div className="user-zone">
        <img src={iconMe} alt="" />
      </div>
    </div>
  )
}

export default Header