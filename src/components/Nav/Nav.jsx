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
    display: "block",
    position: "relative",
    zIndex: 2,
    margin: "0px",
  },
  container: {
    height: "65px",
    backgroundColor: theme.primaryWhite,
    boxShadow: "0 5px 10px rgba(50,50,93,.25)",
  }
});

export default withStyles(styles)(Nav);
