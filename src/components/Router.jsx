import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import * as route from "../constants/RouterConstants";
import DashboardContainer from "../containers/DashboardContainer";
import PlayContainer from "../containers/PlayContainer";
import SoloContainer from "../containers/SoloContainer";

const Router = () => (
  <Switch>
    <Route exact path={route.HOME_PATH} component={DashboardContainer} />
    <Route exact path={route.PLAY_PATH} component={PlayContainer} />
    <Route exact path={route.SOLO_PATH} component={SoloContainer} />
    <Route
      exact
      path={`${route.PLAY_PATH}/:roomId`}
      component={PlayContainer}
    />
    <Redirect to={route.HOME_PATH} />
  </Switch>
);

export default Router;
