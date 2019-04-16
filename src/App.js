import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import anime from 'animejs'

import Routes from './routes'

import { Ocean } from './components'

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
          <Ocean />
          <Routes />
        </div>
      </UserProvider>
    </StoreProvider>
  );
}

export default withRouter(App);
