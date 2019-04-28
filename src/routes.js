import React, { Fragment, Component, useContext } from "react";
import { Switch, Route } from "react-router-dom";
import _ from "lodash";

import { Prelude, Login, MainMenu, Discover, NotFound, About, Credit, Terms } from "./pages";
import { Header, Footer } from "./components";

import { components, userContext } from "./lib";

const { PrivateRoute } = components;
const { UserConsumer } = userContext;

// const isShowCategory = currentPage => {
//   return currentPage !== "/login" || currentPage !== "/add";
// };

const withNavigation = ({ component: Component, showCategory, ...rest }) => {
  return (
    <Fragment>
      <Header showCategory={showCategory} {...rest} />
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
            withNavigation({ component: Login, showCategory: false, ...props, ...userProps })
          }
        />
        <Route
          exact
          path="/credit"
          render={props =>
            withNavigation({ component: Credit, showCategory: false, ...props, ...userProps })
          }
        />
        <Route
          exact
          path="/about"
          render={props =>
            withNavigation({ component: About, showCategory: false, ...props, ...userProps })
          }
        />
        <Route
          exact
          path="/terms"
          render={props =>
            withNavigation({ component: Terms, showCategory: false, ...props, ...userProps })
          }
        />
        <Route path="/discover" render={(props) => withNavigation({ component: Discover, showCategory: true, ...props, ...userProps })} />
        <Route path="/discover/:category" render={(props) => withNavigation({ component: Discover, showCategory: true, ...props, ...userProps })} />
        <Route path="/*" component={NotFound} />
      </Switch>
    )}
  </UserConsumer>
);

export default routes;
