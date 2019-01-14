import React from "react";
import PropTypes from "prop-types";
import DashboardPlay from "./DashboardPlay";
import DashboardProfile from "./DashboardProfile";
import injectSheet from "react-jss";
import { useEffect } from "react";
import DashboardNews from "./DashboardNews";

export const Dashboard = props => {
  const { client, updateClient, classes, initSocket } = props;

  return (
    <main>
      <div className={classes.stripe} />
      <div className={classes.root}>
        <DashboardNews></DashboardNews>
        <DashboardProfile updateClient={updateClient} client={client} />
        <DashboardPlay
          initSocket={initSocket}
          socket={props.socket}
          client={client}
        />
      </div>
    </main>
  );
};

const styles = theme => ({
  root: {
    display: "grid",
    gridTemplateColumns: "auto min-content auto",
    gridTemplateRows: "auto",
    maxWidth: "1040px",
    margin: "0 auto"
  },
  stripe: {
    zIndex: 0,
    width: "100%",
    height: "85%",
    overflow: "hidden",
    WebkitTransform: "skwY(-12deg)",
    transform: "skewY(-12deg)",
    WebkitTransformOrigin: 0,
    transformOrigin: 0,
    backgroundColor: theme.tertiaryWhite,
    position: "absolute"
  },
  container: {
    display: "flex",
    position: "relative",
    margin: "20px 0px 20px auto",
    padding: "5px 5px",
    width: "100%"
  }
});

export default injectSheet(styles)(Dashboard);
