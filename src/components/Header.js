import React from 'react'

import AppLogo from './AppLogo'
import Category from './Category'

import iconMe from '../images/me.png'

const Header = () => {
  return (
    <div className="header">
      <div className="title">
        <AppLogo />
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