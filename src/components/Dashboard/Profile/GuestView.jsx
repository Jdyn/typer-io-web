import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import DashboardProfileHeader from "../DashboardProfileHeader";
import DashboardProfileFooter from "../DashboardProfileFooter";

const propTypes = {
  classes: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  updateClient: PropTypes.func.isRequired,
  changeProfile: PropTypes.func.isRequired
};

const GuestView = props => {
  const { classes, updateClient, client, changeProfile } = props;
  return (
    <div className={classes.inner}>
      <DashboardProfileHeader
        updateClient={updateClient}
        username={client.username}
      />
      <DashboardProfileFooter changeProfile={changeProfile} />
    </div>
  );
};

GuestView.propTypes = propTypes;

const styles = theme => ({
  inner: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    height: "100%"
  }
});

export default withStyles(styles)(GuestView);
