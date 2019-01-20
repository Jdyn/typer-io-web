import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import DashboardProfileHeader from "../DashboardProfileHeader";
import DashboardProfileFooter from "../DashboardProfileFooter";

const propTypes = {
  updateClient: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired
};

const UserProfile = props => {
  const { classes, updateClient, client, shouldRender } = props;

  return (
    <div className={classes.inner}>
      This is the user profile
      <DashboardProfileFooter />
    </div>
  );
};

UserProfile.propTypes = propTypes;

const styles = theme => ({
  inner: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    height: "100%"
  }
});

export default withStyles(styles)(UserProfile);
