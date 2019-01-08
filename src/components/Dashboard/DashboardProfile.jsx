import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import DashboardProfileHeader from "./DashboardProfileHeader";

const propTypes = {
  updateClient: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired
};

const DashboardProfile = props => {
  const { classes, updateClient, client } = props;

  return (
    <div className={classes.container}>
      <DashboardProfileHeader
        updateClient={updateClient}
        username={client.username}
      />
    </div>
  );
};

DashboardProfile.propTypes = propTypes;

const styles = theme => ({
  container: {
    display: "flex",
    position: "relative",
    margin: "40px 0px 40px auto",
    // padding: "5px 5px",
    borderRadius: 8,
    backgroundColor: theme.primaryWhite,
    boxShadow: "0 50px 100px -20px rgba(50,50,93,.25), 0 30px 60px -30px rgba(0,0,0,.3)"
  }
});

export default injectSheet(styles)(DashboardProfile);
