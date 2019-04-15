import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import anime from 'animejs'

import Routes from './routes'

import { Header, Footer } from './components'
import { Home, Prelude } from './pages'

import { userContext } from './lib'
import { storeContext } from './lib'

const { UserProvider } = userContext
const { StoreProvider } = storeContext

const App = ({ history }) => {
  // const handleEndPrelude = () => {
  //   history.push('/menu')
  // }
  return (
    <StoreProvider>
      <UserProvider>
        <div className="app">
          <Routes />
          {/* <Prelude onEnded={setReady} /> */}
        </div>
      </UserProvider>
    </StoreProvider>
  );
}

export default withRouter(App);
