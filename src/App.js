import React, { useState, useEffect } from 'react';
import anime from 'animejs'

import { Container, Header, Footer } from './components'

import boat from './images/boat.png'

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
      <Container>
        <img src={boat} alt="" />
        <p>(idiom) </p>
        <p>Used in reference to an opportunity that has passed or a situation that can no longer be changed.</p>
        <p>Used in reference to an opportunity that has passed or a situation that can no longer be changed.</p>
      </Container>
      <div className="" style={{ marginTop: isReady ? 80 : 0 }}>
      </div>
      <Footer active={isReady} />
    </div>
  );
}

export default App;
