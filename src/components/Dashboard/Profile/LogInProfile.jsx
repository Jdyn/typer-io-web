import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import DashboardProfileHeader from "../DashboardProfileHeader";
import DashboardProfileFooter from "../DashboardProfileFooter";

const propTypes = {
  updateClient: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired
};

const LogInProfile = props => {
  const { classes, changeProfile } = props;

  return (
    <div className={classes.inner}>
      This is the log in
      <button onClick={() => changeProfile("BACK")}>back</button>
    </div>
  );
};

LogInProfile.propTypes = propTypes;

const styles = theme => ({
  inner: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    height: "100%",
    width: "275px"
  }
});

export default withStyles(styles)(LogInProfile);
