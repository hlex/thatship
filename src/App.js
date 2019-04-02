import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import anime from 'animejs'

import Routes from './routes'

import { Header, Footer } from './components'
import { Home, Prelude } from './pages'

import { userContext } from './lib'

const { UserProvider } = userContext

const App = ({ history }) => {
  // const handleEndPrelude = () => {
  //   history.push('/menu')
  // }
  return (
    <UserProvider>
      <div className="app">
        <Routes />
        {/* <Prelude onEnded={setReady} /> */}
      </div>
    </UserProvider>
  );
}

export default withRouter(App);
