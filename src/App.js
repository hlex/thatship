import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import anime from 'animejs'

import Routes from './routes'

import { Ocean } from './components'

import { userContext, storeContext } from './lib'
import { verifyCanRunOnThisPlatform } from './utils'

import mobileGif from './images/mobile_ship.gif'

const { UserProvider } = userContext
const { StoreProvider } = storeContext

const App = (props) => {

  const [canPlay, setPlay] = useState(true)

  const handleResize = () => {
    if (!verifyCanRunOnThisPlatform()) {
      setPlay(false)
    } else if (!canPlay) {
      setPlay(true)
    }
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!canPlay) {
    return (
      <div className="mobile-renderer">
        <img src={mobileGif} alt="" />
      </div>
    )
  }

  const { history } = props
  const isDiscoverPage = history.location.pathname === '/discover'
  return (
    <StoreProvider>
      <UserProvider>
        <div className="app">
          {!isDiscoverPage && <Ocean />}
          <Routes />
        </div>
      </UserProvider>
    </StoreProvider>
  );
}

export default withRouter(App);
