import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import DashboardProfileHeader from "../DashboardProfileHeader";
import Button from "../../Common/Button";

const propTypes = {
  updateClient: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired
};

const UserProfile = props => {
  const { classes, changeProfile, username, theme } = props;

  const logout = event => {
    event.preventDefault();

    changeProfile("LOG_OUT");
  };

  return (
    <div className={classes.inner}>
      <DashboardProfileHeader username={username} />

      <div className={classes.wrapper}>
        <Button
          onClick={e => logout(e)}
          backgroundColor={theme.primaryWhite}
          width="65%"
          margin="5px auto 0px auto"
          color="#6772e5"
          activeColor={"#6772e580"}
        >
          log out
        </Button>
      </div>
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
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    margin: "auto 0px 25px 0px"
  }
});

export default withStyles(styles, { injectTheme: true })(UserProfile);
