import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ render, location }) => {
  const hasUser = localStorage.getItem("localStorageUser");
  if (hasUser) {
    return <Route render={render} />;
  }
  return (
    <Redirect
      to={{
        pathname: "/login",
        state: { from: location }
      }}
    />
  );
};

export default PrivateRoute;
