import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import DashboardProfileHeader from "../DashboardProfileHeader";
import DashboardProfileFooter from "../DashboardProfileFooter";

const propTypes = {
  updateClient: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired
};

const DashboardProfile = props => {
  const { classes, updateClient, client, theme } = props;

  return (
    <div className={classes.inner}>
      <DashboardProfileHeader
        updateClient={updateClient}
        username={client.username}
      />
      <DashboardProfileFooter />
    </div>
  );
};

DashboardProfile.propTypes = propTypes;

const styles = theme => ({
  inner: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    height: "100%"
  }
});

export default injectSheet(styles)(DashboardProfile);
