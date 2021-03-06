import React, { Fragment, useContext } from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import ReactTooltip from 'react-tooltip'

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

  const { store, setStore } = useContext(StoreContext)
  const { activeCategory } = store

  const handleLogout = () => {
    const confirmLogout = window.confirm("Do you want to logout ?");
    if (confirmLogout) userLogout()
  }

  const handleSelectCategory = (categoryValue) => {
    setStore({ activeCategory: categoryValue })
  }

  const handleShowAllUserBoats = () => {
    setStore({
      showAllUserBoat: true
    })
  }

  const handleShowAllBoats = () => {
    setStore({
      showAllUserBoat: false
    })
  }

  const renderAvatar = () => {
    if (isLoggedIn) return <Avatar src={user.imageProfile} onClick={handleShowAllUserBoats} />
    return (
      <Fragment>
        <Link to="/login" data-tip data-for='login'><img className="empty-avatar" src={iconMe} alt="login" /></Link>
        <ReactTooltip id="login" place="bottom" type="dark" effect="solid">
          <p>Login</p>
        </ReactTooltip>
      </Fragment>

    )
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
          <div className={`user-zone show`}>
            <a data-tip data-for='show-all-user-boats'><img onClick={handleShowAllBoats} className="compass" src={iconCompass} alt="" /></a>
            <ReactTooltip id="show-all-user-boats" place="bottom" type="dark" effect="solid">
              <p>Show All Boats</p>
            </ReactTooltip>
            {renderAvatar()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header