
import React, { createContext, useState, useEffect } from "react";

import { firebase } from '../'

const StoreContext = createContext();
const { Consumer, Provider } = StoreContext

const initialStore = {
  boats: {},
  activeCategory: ''
}

const StoreProvider = ({ children }) => {
  const [store, setStore] = useState(initialStore)

  useEffect(() => {
    fetchDataFromFireStore()
  }, [])

  const fetchDataFromFireStore = async () => {
    const data = {}
    const querySnapshot = await firebase.db.collection('boats').get()
    querySnapshot.forEach((doc) => {
      data[doc.id] = doc.data()
    });
    console.log('fetchDataFromFireStore', data)
    setStore({
      boats: data
    })
  }

  const props = {
    store,
    setStore
  }

  return (
    <Provider value={props}>
      {children}
    </Provider>
  )
}

export default {
  StoreContext,
  StoreConsumer: Consumer,
  StoreProvider
}