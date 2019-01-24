import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import * as route from '../constants/RouterConstants'

import DashBoardContainer from '../containers/DashboardContainer'
import PlayContainer from '../containers/PlayContainer'

const Router = () => (
  <Switch>
    <Route exact path={route.HOME_PATH} component={DashBoardContainer}/>
    <Route exact path={route.PLAY_PATH} component={PlayContainer} />
    <Redirect to={route.HOME_PATH} />
  </Switch>
);

export default Router;