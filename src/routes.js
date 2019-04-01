import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import { Prelude, Login, Discover, NotFound } from "./pages";

import { components } from "./lib";

const { PrivateRoute } = components;

export default () => (
  <Switch>
    <Route exact path="/" component={Prelude} />
    <Route exact path="/login" component={Login} />
    <PrivateRoute path="/discover/:type" component={Discover} />
    <Route path="/*" component={NotFound} />
  </Switch>
);
