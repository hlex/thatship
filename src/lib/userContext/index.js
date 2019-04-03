import React, { createContext, useState, useEffect } from "react";

import firebase from '../firebase'

const UserContext = createContext();
const { Consumer, Provider } = UserContext

const initialUser = {
  uid: '',
  imageProfile: '',
  email: '',
  displayName: '',
  isAnonymous: false
}

const UserProvider = ({ children }) => {
  const [verifiedUser, setVerifyUser] = useState(false)
  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    if (!verifiedUser) {
      firebase.auth().onAuthStateChanged((result) => {
        if (result) {
          const localStorageUser = localStorage.getItem('localStorageUser')
          if (localStorageUser) {
            setUser(JSON.parse(localStorageUser))
          }
        }
        setVerifyUser(true)
      });
    }
  })

  const isLoggedIn = user.uid !== '' && user.isAnonymous === false

  const userLogin = (loginUser) => {
    console.log('userLogin', loginUser)
    // save to localStorage
    localStorage.setItem('localStorageUser', JSON.stringify(loginUser))
    // setState
    setUser(loginUser)
  }

  const userLogout = async () => {
    await firebase.auth().signOut()
    localStorage.removeItem("localStorageUser");
    setUser({})
  }

  return <Provider value={{ user, userLogin, userLogout, isLoggedIn }}>{children}</Provider>;
};

export default {
  UserContext,
  UserConsumer: Consumer,
  UserProvider
};
