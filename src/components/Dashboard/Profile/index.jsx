import React, { useState } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import Header from "../../Common/Header";
import GuestProfile from "./GuestProfile";
import LogInProfile from "./LogInProfile";
import SignInProfile from "./SignUpProfile";
import UserProfile from "./UserProfile";

const propTypes = {
  updateClient: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired
};

const DashboardProfile = props => {
  const { classes, updateClient, client, theme } = props;
  const isLoggedIn = false;
  const [profile, setProfile] = useState(
    "SIGN_UP_PROFILE"
    // isLoggedIn ? "USER_PROFILE" : "GUEST_PROFILE"
  );

  const changeProfile = newProfile => {
    switch (newProfile) {
      case "BACK":
        setProfile(isLoggedIn ? "USER_PROFILE" : "GUEST_PROFILE");
        break;
      default:
        setProfile(newProfile);
        break;
    }
  };

  const renderProfile = profile => {
    switch (profile) {
      case "GUEST_PROFILE":
        return (
          <GuestProfile
            changeProfile={changeProfile}
            updateClient={updateClient}
            client={client}
          />
        );
      case "USER_PROFILE":
        return <UserProfile />;
      case "SIGN_UP_PROFILE":
        return <SignInProfile changeProfile={changeProfile} />;
      case "LOG_IN_PROFILE":
        return <LogInProfile changeProfile={changeProfile} />;
    }
  };

  return (
    <div className={classes.container}>
      <Header
        boxShadow="0 5px 20px rgba(35,35,80,.25)"
        color={theme.primaryWhite}
        borderRadius="8px 8px 0px 0px"
        fontSize={24}
        backgroundColor={"#555abf"}
        padding="10px"
      >
        Profile
      </Header>

      {renderProfile(profile)}
    </div>
  );
};

DashboardProfile.propTypes = propTypes;

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    margin: "40px 0px 40px 0px",
    "&:hover": {
      transform: "translateY(-1px)"
    },
    transitionDuration: ".2s",
    borderRadius: 8,
    backgroundColor: theme.primaryWhite,
    boxShadow:
      "0 50px 100px -20px rgba(50,50,93,.25), 0 30px 60px -30px rgba(0,0,0,.3)"
  }
});

export default withStyles(styles, { injectTheme: true })(DashboardProfile);
