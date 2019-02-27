import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import ProfileHeader from "./ProfileHeader";
import Button from "../../Common/Button";

const propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  updateClient: PropTypes.func.isRequired,
  changeProfile: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

const ClientView = props => {
  const {
    classes,
    theme,
    username,
    updateClient,
    changeProfile,
    logout
  } = props;

  const handleClick = event => {
    event.preventDefault();
    logout();
    changeProfile("LOG_OUT");
  };

  return (
    <div className={classes.inner}>
      <ProfileHeader username={username} updateClient={updateClient} />
      <div className={classes.wrapper}>
        <Button
          onClick={e => handleClick(e)}
          backgroundColor={theme.primaryWhite}
          width="65%"
          margin="5px auto 0px auto"
          color="#6772e5"
          activeColor={"#6772e580"}
          borderColor={theme.divider}
        >
          log out
        </Button>
      </div>
    </div>
  );
};

ClientView.propTypes = propTypes;

const styles = {
  inner: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    height: "100%"
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    margin: "auto 0px 25px 0px"
  }
};

export default withStyles(styles, { injectTheme: true })(ClientView);
