import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import DashboardProfileHeader from "./DashboardProfileHeader";
import CommonPaper from "../CommonComponents/CommonPaper";

const propTypes = {
  initClient: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired
};

const DashboardProfile = props => {
  const { classes, initClient, client } = props;

  return (
    <div className={classes.container}>
      <CommonPaper>
        <DashboardProfileHeader
          initClient={initClient}
          username={client.username}
        />
      </CommonPaper>
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
