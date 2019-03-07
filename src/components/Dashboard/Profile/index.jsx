import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import Header from "../../Common/Header";
import GuestView from "./GuestView";
import LogInView from "./LogInView";
import ClientView from "./ClientView";
import SignUpView from "./SignUpView";
import ProfileHeader from "./ProfileHeader";

const propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  updateClient: PropTypes.func.isRequired
};

const DashboardProfile = props => {
  const {
    classes,
    theme,
    client,
    session,
    login,
    logout,
    signup,
    updateClient,
    clearSessionErrors
  } = props;

  const [profile, setProfile] = useState(session.isLoggedIn ? "CLIENT_VIEW" : "GUEST_VIEW");

  useEffect(() => {
    if (!session.isAuthenticating) {
      setProfile(session.isLoggedIn ? "CLIENT_VIEW" : "GUEST_VIEW");
    }
  }, [session.isLoggedIn]);

  const changeProfile = newProfile => {
    const { isLoggedIn } = session;
    switch (newProfile) {
      case "BACK":
        return setProfile(isLoggedIn ? "CLIENT_VIEW" : "GUEST_VIEW");
      case "LOG_OUT":
        return setProfile("GUEST_VIEW");
      default:
        return setProfile(newProfile);
    }
  };

  const renderProfile = profile => {
    switch (profile) {
      case "GUEST_VIEW":
        return (
          <GuestView changeProfile={changeProfile} updateClient={updateClient} client={client} />
        );
      case "CLIENT_VIEW":
        return (
          <ClientView
            username={client.username}
            updateClient={updateClient}
            changeProfile={changeProfile}
            logout={logout}
          />
        );
      case "SIGNUP_VIEW":
        return (
          <SignUpView
            changeProfile={changeProfile}
            clearSessionErrors={clearSessionErrors}
            signup={signup}
            session={session}
          />
        );
      case "LOGIN_VIEW":
        return (
          <LogInView
            changeProfile={changeProfile}
            clearSessionErrors={clearSessionErrors}
            login={login}
            session={session}
          />
        );
      default:
        return (
          <div className={classes.loading}>
            <ProfileHeader updateClient={updateClient} username={client.username} />
          </div>
        );
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
    width: "100%",
    gridArea: "profile",
    // maxWidth: "275px",
    position: "relative",
    margin: 0,
    borderRadius: 8,
    boxShadow: "0 50px 100px -20px rgba(50,50,93,.25), 0 30px 60px -30px rgba(0,0,0,.3)",
    backgroundColor: theme.primaryWhite
  }
});

export default withStyles(styles, { injectTheme: true })(DashboardProfile);
