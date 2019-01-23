import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import DashboardProfileHeader from "../DashboardProfileHeader";
import Button from "../../Common/Button";

const propTypes = {
  updateClient: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired
};

const ClientView = props => {
  const { classes, changeProfile, username, theme, logout } = props;

  const handleClick = event => {
    event.preventDefault();
    logout()
    changeProfile("LOG_OUT");
  };

  return (
    <div className={classes.inner}>
      <DashboardProfileHeader username={username} />

      <div className={classes.wrapper}>
        <Button
          onClick={e => handleClick(e)}
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

ClientView.propTypes = propTypes;

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

export default withStyles(styles, { injectTheme: true })(ClientView);
