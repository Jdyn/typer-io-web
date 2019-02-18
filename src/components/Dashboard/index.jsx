import React from "react";
import PropTypes from "prop-types";
import DashboardMenu from "./DashboardMenu";
import DashboardProfile from "./Profile";
import withStyles from "react-jss";
import MatchHistory from "./MatchHistory/";

const propTypes = {
  classes: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
  updateClient: PropTypes.func.isRequired,
  initSocket: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired
};

const Dashboard = props => {
  const {
    classes,
    client,
    matches,
    updateClient,
    session,
    initSocket,
    login,
    logout,
    signup,
    deleteMatch
  } = props;

  return (
    <main>
      <div className={classes.stripe} />
      <div className={classes.root}>
        {/* <DashboardNews /> */}
        <MatchHistory matches={matches} deleteMatch={deleteMatch}/>
        <DashboardProfile
          login={login}
          logout={logout}
          signup={signup}
          updateClient={updateClient}
          client={client}
          session={session}
        />
        <DashboardMenu
          initSocket={initSocket}
          socket={props.socket}
          client={client}
        />
      </div>
    </main>
  );
};

Dashboard.propTypes = propTypes;

const styles = theme => ({
  root: {
    display: "grid",
    marginTop: "120px",
    gridTemplateColumns: "auto min-content auto",
    gridTemplateRows: "auto",
    maxWidth: "1185px",
    margin: "0 auto"
  },
  stripe: {
    zIndex: 0,
    width: "100%",
    height: "100%",
    top: -10,
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
