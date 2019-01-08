import React from "react";
import PropTypes from "prop-types";
import DashboardPlay from "./DashboardPlay";
import DashboardProfile from "./DashboardProfile";
import injectSheet from "react-jss";
import io from "socket.io-client";

export const Dashboard = props => {
  const { client, updateClient, classes, socket } = props;
  return (
    <main>
      <div className={classes.stripe} />
      <div className={classes.root}>
        <DashboardProfile updateClient={updateClient} client={client} />
        <DashboardPlay history={props.history}/>
      </div>
    </main>
  );
};

const styles = theme => ({
  root: {
    display: "grid",
    gridTemplateColumns: "auto auto",
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
    backgroundColor: theme.secondaryWhite,
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
