import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import * as route from '../constants/RouterConstants'

import HomeContainer from '../containers/HomeContainer'
import AboutContainer from '../containers/AboutContainer'

const Router = () => (
  <Switch>
    <Route exact path={route.HOME_PATH} component={HomeContainer}/>
    <Route exact path={route.ABOUT_PATH} component={AboutContainer}/>

    <Redirect to={route.HOME_PATH} />
  </Switch>
);

export default Router;