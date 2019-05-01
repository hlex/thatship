import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import anime from 'animejs'

import Routes from './routes'

import { Ocean } from './components'

import { userContext, storeContext } from './lib'
import { verifyCanRunOnThisPlatform } from './utils'

import mobileGif from './images/mobile_ship.gif'

const sound = `sound_compressed.mp3?`

const { UserProvider } = userContext
const { StoreProvider } = storeContext

const App = (props) => {

  const { history } = props

  const [audio, setAudio] = useState(new Audio()) // eslint-disable-line)
  const [isPlayingAudio, setPlayingAudio] = useState(false)
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

  useEffect(() => {
    if (history.location.pathname !== '' && !isPlayingAudio) {
      // play audio
      const audio = new Audio(sound) // eslint-disable-line
      audio.play()
      setAudio(audio)
      setPlayingAudio(true)
    }
  }, [history.location.pathname])

  if (!canPlay) {
    return (
      <div className="mobile-renderer">
        <img src={mobileGif} alt="" />
      </div>
    )
  }

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
