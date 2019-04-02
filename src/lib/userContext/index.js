import React, { createContext, useState } from "react";

const UserContext = createContext();
const { Consumer, Provider } = UserContext

const initialUser = {
  userId: '',
  imageProfile: '',
  displayName: '',
  anonymous: true
}

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialUser);
  const isLoggedIn = user.userId !== '' && user.anonymous === false
  return <Provider value={{ user, setUser, isLoggedIn }}>{children}</Provider>;
};

export default {
  UserContext,
  UserConsumer: Consumer,
  UserProvider
};
