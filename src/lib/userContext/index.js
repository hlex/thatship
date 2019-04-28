import React, { createContext, useState, useEffect } from "react";
import _ from 'lodash'

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
        console.log('onAuthStateChanged:result', result)
        if (result) {
          const localStorageUser = localStorage.getItem('localStorageUser')
          console.log('onAuthStateChanged:localStorageUser', localStorageUser)
          if (!_.isEmpty(localStorageUser)) {
            const userToSet = JSON.parse(localStorageUser)
            console.log('onAuthStateChanged:userToSet', userToSet)
            setUser(userToSet)
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

  const getUserDisplayName = () => {
    // console.log('getUserDisplayName', user)
    return _.get(user, 'display_name', '')
  }

  const getUserEmail = () => _.get(user, 'email', '')

  const props = {
    user,
    userLogin,
    userLogout,
    isLoggedIn,
    getUserEmail,
    getUserDisplayName
  }

  return <Provider value={props}>{children}</Provider>;
};

export default {
  UserContext,
  UserConsumer: Consumer,
  UserProvider
};
