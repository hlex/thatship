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

  if (!isReady) {
    return (
      <div className="app">
        <Prelude onEnded={setReady} />
      </div>
    )
  }

  return (
    <div className="app">
      <Header />
      <Routes />
      <Footer />
    </div>
  );
}

export default App;
