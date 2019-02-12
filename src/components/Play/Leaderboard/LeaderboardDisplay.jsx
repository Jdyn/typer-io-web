import React from "react";
import withStyles from "react-jss";

const LeaderboardDisplay = props => {
  const { classes, theme } = props;
  return <div className={classes.container} />;
};

const styles = theme => ({
  container: {
    height: "100%",
    backgroundColor: theme.primaryWhite,
    boxShadow: "0px 5px 25px 0px rgba(50,50,93,.25) inset",
    borderRadius: 8,
    zIndex: 150
  }
});
export default withStyles(styles, { injectTheme: true })(LeaderboardDisplay);
