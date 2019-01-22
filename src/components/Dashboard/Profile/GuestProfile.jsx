import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import DashboardProfileHeader from "../DashboardProfileHeader";
import DashboardProfileFooter from "../DashboardProfileFooter";

const propTypes = {
  updateClient: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired
};

const GuestProfile = props => {
  const { classes, updateClient, client, changeProfile } = props;
console.log("rendered")
  return (
    <div className={classes.inner}>
      <DashboardProfileHeader
        updateClient={updateClient}
        username={client.username}
      />

      <DashboardProfileFooter changeProfile={changeProfile}/>
    </div>
  );
};

GuestProfile.propTypes = propTypes;

const styles = theme => ({
  inner: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    height: "100%"
  }
});

export default withStyles(styles)(GuestProfile);
