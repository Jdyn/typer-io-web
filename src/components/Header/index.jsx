import React from "react";
import withStyles from "react-jss";

const Header = props => {
  const { classes } = props;

  return <div className={classes.root} />;
};

const styles = theme => ({
  root: {
    display: "block",
    position: "relative",
    height: "65px",
    backgroundColor: theme.primaryWhite,
    boxShadow: "0 5px 10px rgba(50,50,93,.25)",
    zIndex: 2,
    margin: "0px"
  }
});

export default withStyles(styles)(Header);
