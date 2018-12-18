import PropTypes from "prop-types";
import React from "react";
import DashboardPlay from "./DashboardPlay";
import DashboardProfile from "./DashboardProfile";
import injectSheet from "react-jss";
import CommonPaper from "../CommonComponents/CommonPaper";

const propTypes = {
  socket: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  initClient: PropTypes.func.isRequired
};

export const Dashboard = props => {
  const { client, initClient, classes, socket } = props;

  return (
    <main>
      <div className={classes.stripe} />
      <div className={classes.root}>
        {/* <div className={classes.container}>
          <CommonPaper />
        </div> */}
        <DashboardProfile initClient={initClient} client={client} />
        <DashboardPlay socket={socket} />
      </div>
    </main>
  );
};

Dashboard.propTypes = propTypes;

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
