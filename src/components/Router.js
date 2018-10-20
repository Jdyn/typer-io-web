import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import * as route from '../constants/RouterConstants'

import Home from '../containers/Home'
import About from '../containers/About'

const Router = () => (
  <Switch>
    <Route exact path={route.HOME_PATH} component={Home}/>
    <Route exact path={route.ABOUT_PATH} component={About}/>

    <Redirect to={route.HOME_PATH} />
  </Switch>
);

export default Router;