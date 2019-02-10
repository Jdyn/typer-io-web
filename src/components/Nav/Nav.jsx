import React from "react";
import withStyles from "react-jss";

const Nav = props => {
  const { classes } = props;

  return (
    <header className={classes.root}>
      <nav className={classes.container} />
    </header>
  );
};

const styles = theme => ({
  root: {
    zIndex: 2,
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    margin: "auto",
    display: "block"
  },

  container: {
    margin: 0,
    padding: 0,
    // height: "55px",
    backgroundColor: "transparent",//theme.primaryWhite,
    // boxShadow: "0 5px 10px rgba(50,50,93,.25)",
    borderRadius: 0
  }
});

export default withStyles(styles)(Nav);
