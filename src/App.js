import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import anime from 'animejs'

import Routes from './routes'

import { Ocean } from './components'

import { userContext } from './lib'
import { storeContext } from './lib'

const { UserProvider } = userContext
const { StoreProvider } = storeContext

const App = (props) => {
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
