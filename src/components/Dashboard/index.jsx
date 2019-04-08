import React from "react";
import PropTypes from "prop-types";
import DashboardMenu from "./menu";
import DashboardProfile from "./profile";
import withStyles from "react-jss";
import MatchHistory from "./matchHistory";

const propTypes = {
  classes: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
  socket: PropTypes.object.isRequired,
  matches: PropTypes.array,
  updateClient: PropTypes.func.isRequired,
  initSocket: PropTypes.func.isRequired,
  deleteMatch: PropTypes.func.isRequired,
  handleAuth: PropTypes.func.isRequired
};

const Dashboard = props => {
  const {
    classes,
    client,
    session,
    socket,
    matches,
    history,
    updateClient,
    initSocket,
    deleteMatch,
    handleAuth
  } = props;

  return (
    <>
      <div className={classes.stripe} />
      <div className={classes.root}>
        <MatchHistory matches={matches} deleteMatch={deleteMatch} />
        <DashboardProfile
          handleAuth={handleAuth}
          updateClient={updateClient}
          client={client}
          session={session}
        />
        <DashboardMenu initSocket={initSocket} socket={socket} client={client} history={history} />
      </div>
    </>
  );
};

Dashboard.propTypes = propTypes;

const styles = theme => ({
  root: {
    display: "grid",
    position: "relative",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "1fr 1fr 1fr",
    gridGap: "15px",
    margin: "95px auto",
    maxWidth: "350px",
    padding: "15px",
    zIndex: 100,
    gridTemplateAreas: `
    'matchHistory'
    'profile'
    'menu'
    `,
    "@media (min-width: 600px)": {
      gridTemplateColumns: "1fr 275px",
      gridTemplateRows: "1fr 1fr",
      maxWidth: "750px",
      gridTemplateAreas: `
      'matchHistory profile'
      'menu menu'
      `
    },
    "@media (min-width: 1130px)": {
      gridTemplateColumns: "400px 275px 1fr",
      gridTemplateRows: "455px",
      // padding: "20px 60px 115px 60px",
      maxWidth: "1085px",
      gridTemplateAreas: `
      'matchHistory profile menu'
      `
    }
  },
  stripe: {
    zIndex: -1,
    width: "100%",
    height: "95%",
    top: 0,
    overflow: "hidden",
    WebkitTransform: "skwY(-12deg)",
    transform: "skewY(-12deg)",
    WebkitTransformOrigin: 0,
    transformOrigin: 0,
    backgroundColor: theme.tertiary,
    position: "absolute"
  }
});

export default withStyles(styles)(Dashboard);
