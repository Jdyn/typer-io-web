import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import DashboardProfileHeader from "./DashboardProfileHeader";
import DashboardPaper from "./DashboardPaper";

const propTypes = {
  initClient: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired
};

const DashboardProfile = props => {
  const { classes, initClient, client } = props;

  return (
    <div className={classes.container}>
      <DashboardPaper>
        <DashboardProfileHeader
          initClient={initClient}
          username={client.username}
        />
      </DashboardPaper>
    </div>
  );
};

DashboardProfile.propTypes = propTypes

const styles = {
  container: {
    display: "flex",
    position: "relative",
    margin: "20px 0px 20px auto",
    padding: "5px 5px"
  }
};

export default injectSheet(styles)(DashboardProfile);
