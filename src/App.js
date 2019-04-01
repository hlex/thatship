import React, { useState, useEffect } from 'react';
import anime from 'animejs'

import { Header, Footer } from './components'
import { Home } from './pages'


const App = () => {
  const [appState, setAppState] = useState('init')
  useEffect(() => {
    if (appState === 'init') {
      setTimeout(() => {
        setAppState('prelude')
      }, 3000)
    } else if (appState === 'prelude') {
      setTimeout(() => {
        setAppState('ready')
      }, 3000)
    }
  })
  const isReady = () => appState === 'ready'
  return (
    <div className="app">
      <Header active={isReady} />
      <Home />
      <Footer active={isReady} />
    </div>
  );
}

export default App;
