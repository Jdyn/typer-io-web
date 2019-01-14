import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import DashboardProfileHeader from "./DashboardProfileHeader";
import Header from "../Common/Header";

const propTypes = {
  updateClient: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired
};

const DashboardProfile = props => {
  const { classes, updateClient, client, theme } = props;

  return (
    <div className={classes.container}>
      <Header boxShadow="0 5px 20px rgba(35,35,80,.25)" color={theme.primaryWhite} borderRadius="8px 8px 0px 0px" fontSize={24} backgroundColor={"#6772e5"} padding="10px">Profile</Header>
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
    position: "relative",
    margin: "40px 0px 40px 0px",
    "&:hover": {
      transform: "translateY(-2px)",
    },
    transitionDuration: ".3s",
    borderRadius: 8,
    backgroundColor: theme.primaryWhite,
    boxShadow: "0 50px 100px -20px rgba(50,50,93,.25), 0 30px 60px -30px rgba(0,0,0,.3)"
  }
});

export default injectSheet(styles)(DashboardProfile);
