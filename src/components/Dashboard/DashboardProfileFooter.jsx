import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import Button from "../Common/Button";
import Divider from "../Common/Divider";

const propTypes = {};

const DashboardProfileFooter = props => {
  const { classes, theme, changeProfile } = props;
  return (
    <div className={classes.container}>
      <Divider />
      <Button
        onClick={() => changeProfile("LOGIN_VIEW")}
        backgroundColor={theme.primaryWhite}
        width="65%"
        margin="5px auto 0px auto"
        color="#6772e5"
        activeColor={"#6772e580"}
      >
        log in
      </Button>
      <Button
        onClick={() => changeProfile("SIGNUP_VIEW")}
        backgroundColor={"#6772e5"}
        width="65%"
        margin="5px auto 0 auto"
        color={theme.primaryWhite}
        activeColor={"#fafafa80"}
      >
        sign up
      </Button>
    </div>
  );
};

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    margin: "auto 0px 25px 0px"
  },
  divider: {
    display: "flex",
    position: "relative",
    height: "2px",
    margin: "auto",
    border: "none",
    flexShrink: 0,
    width: "65%",
    backgroundColor: theme.divider
  }
});

DashboardProfileFooter.propTypes = propTypes;

export default withStyles(styles, { injectTheme: true })(
  DashboardProfileFooter
);
