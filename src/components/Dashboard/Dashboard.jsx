import PropTypes from "prop-types";
import React, { Fragment } from "react";
import DashboardPlay from "./DashboardPlay";
import DashboardProfile from "./DashboardProfile";
import injectSheet from "react-jss";

const propTypes = {
  socket: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  initClient: PropTypes.func.isRequired
};

export const Dashboard = props => {
  const { socket, client, initClient, classes } = props;

  return (
    <main>
      <div className={classes.stripe} />
      <div className={classes.root}>
        <DashboardProfile initClient={initClient} client={client} />
        <DashboardPlay />
      </div>
    </main>
  );
};

Dashboard.propTypes = propTypes;

const styles = theme => ({
  root: {
    display: "flex",
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
    backgroundColor: theme.secondaryWhite,
    position: "absolute"
  }
});

export default injectSheet(styles)(Dashboard);
