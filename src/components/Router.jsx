import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import DashboardContainer from "../containers/DashboardContainer";
import PlayContainer from "../containers/PlayContainer";
import SoloContainer from "../containers/SoloContainer";
import LobbyContainer from "../containers/LobbyContainer";
import ForumContainer from "../containers/ForumContainer";

const routes = {
  home: "/",
  play: "/play",
  solo: "/solo",
  lobby: "/lobby",
  forum: {
    feed: "/forum",
    post: "/forum/post",
    new: "/forum/new"
  }
};

const Router = () => (
  <Switch>
    <Route exact path={routes.home} component={DashboardContainer} />
    <Route exact path={routes.play} component={PlayContainer} />
    <Route exact path={routes.solo} component={SoloContainer} />
    <Route exact path={routes.lobby} component={LobbyContainer} />
    <Route exact path={`${routes.lobby}/:room_id`} component={LobbyContainer} />

    <Route exact path={routes.forum.feed} component={ForumContainer} />
    <Route exact path={`${routes.forum.post}/:post_id`} component={ForumContainer} />
    <Route exact path={routes.forum.new} component={ForumContainer} />

    <Redirect to={routes.home} />
  </Switch>
);

export default Router;
