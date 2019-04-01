import React, { useState, useEffect } from 'react';
import anime from 'animejs'

import Routes from './routes'

import { Header, Footer } from './components'
import { Home, Prelude } from './pages'

const App = () => {
  const [appState, setAppState] = useState('init')
  // useEffect(() => {

  // })
  const handleChangeAppState = (state) => {
    setAppState(state)
  }

  const setReady = () => {
    handleChangeAppState('ready')
  }

  const isReady = appState === 'ready'

  console.log('appState', appState)

  return (
    <div className="app">
      {isReady && <Header />}
      <Prelude onEnded={setReady} />
      {isReady && <Routes />}
      {isReady && <Footer />}
    </div>
  );
}

export default App;
