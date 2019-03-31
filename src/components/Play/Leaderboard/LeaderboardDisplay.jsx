import React from "react";
import withStyles from "react-jss";

const LeaderboardDisplay = props => {
  const { classes } = props;
  return <div className={classes.container} />;
};

const styles = theme => ({
  container: {
    display: "flex",
    flexGrow: 1,
    backgroundColor: theme.white,
    boxShadow: "0px 0px 25px 0px rgba(50,50,93,.3) inset",
    borderRadius: "0 0 8px 8px",
    zIndex: 150
  }
});
export default withStyles(styles, { injectTheme: true })(LeaderboardDisplay);
