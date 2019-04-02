import React, { Fragment, Component, useContext } from "react";
import { Switch, Route } from "react-router-dom";
import _ from "lodash";

import { Prelude, Login, MainMenu, Discover, NotFound } from "./pages";
import { Header, Footer } from "./components";

import { components, userContext } from "./lib";

const { PrivateRoute } = components;
const { UserConsumer } = userContext;

// const isShowCategory = currentPage => {
//   return currentPage !== "/login" || currentPage !== "/add";
// };

const withNavigation = ({ component: Component, ...rest }) => {
  // const currentPage = _.get(location, 'pathname', '')
  // const contextValue = useContext(userContext)
  // console.log('contextValue', contextValue)
  return (
    <Fragment>
      <Header {...rest} />
      <Component {...rest} />
      <Footer {...rest} />
    </Fragment>
  );
};

const routes = () => (
  <UserConsumer>
    {userProps => (
      <Switch>
        <Route exact path="/" render={(props) => <Prelude {...props} />} />
        <Route exact path="/menu" render={(props) => <MainMenu {...props} />} />
        <Route
          exact
          path="/login"
          render={props =>
            withNavigation({ component: Login, ...props, ...userProps })
          }
        />
        <PrivateRoute path="/discover/:type" render={(props) => <Discover {...props} />} />
        <Route path="/*" component={NotFound} />
      </Switch>
    )}
  </UserConsumer>
);

export default routes;
