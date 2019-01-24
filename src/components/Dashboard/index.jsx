import React from "react";
// import PropTypes from "prop-types";
import DashboardPlay from "./DashboardPlay";
import DashboardProfile from "./Profile";
import withStyles from "react-jss";
import DashboardNews from "./DashboardArena";

export const Dashboard = props => {
  const { client, updateClient, classes, initSocket, login, logout, session } = props;

  return (
    <main>
      <div className={classes.stripe} />
      <div className={classes.root}>
        <DashboardNews />
        <DashboardProfile
          login={login}
          logout={logout}
          updateClient={updateClient}
          client={client}
          session={session}
        />
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

export default withStyles(styles)(Dashboard);
