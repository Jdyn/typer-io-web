import React from "react";
// import PropTypes from "prop-types";
import withStyles from "react-jss";
import Header from "../Common/Header";

const DashboardProfile = props => {
  const { classes, theme } = props;
  return (
    <div className={classes.container}>
      <Header
        boxShadow="0 5px 20px rgba(35,35,80,.25)"
        color={theme.primaryWhite}
        borderRadius="8px 8px 0px 0px"
        fontSize={24}
        backgroundColor={"#555abf"} //"#f7bb10"
        padding="10px"
      >
        Arena
      </Header>
    </div>
  );
};

const styles = theme => ({
  container: {
    position: "relative",
    width: "400px",
    margin: "40px 20px 40px auto",
    borderBottom: "2px solid rgba(207,215,223,.25)",
    borderRadius: 8,
    backgroundColor: theme.primaryWhite,
    boxShadow:
      "0 50px 100px -20px rgba(50,50,93,.25), 0 30px 60px -30px rgba(0,0,0,.3)",
    "&:hover": {
      transform: "translateY(-1px)"
    },
    transitionDuration: ".2s"
  }
});

export default withStyles(styles, { injectTheme: true })(DashboardProfile);
