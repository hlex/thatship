import React from 'react'
import _ from 'lodash'

import AppLogo from './AppLogo'
import Category from './Category'

import iconMe from '../images/me.png'

const Header = ({ isLoggedIn, location }) => {
  console.log({ isLoggedIn, location })
  const showCategory = () => {
    const currentPage = _.get(location, 'pathname', '')
    return currentPage !== '/login' && currentPage !== '/add'
  }

  return (
    <div className="header fixed-top">
      <div className="container">
        <div className="content">
          <div className="title">
            <AppLogo />
            <p>Confess your Regret and sail it away!</p>
          </div>
          <div className={`category-list ${showCategory() ? 'show' : ''}`}>
            <Category />
          </div>
          <div className={`user-zone ${isLoggedIn} ? 'show' : ''`}>
            <img src={iconMe} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header