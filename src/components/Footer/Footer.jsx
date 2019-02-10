import React from "react";
import withStyles from "react-jss";

const Footer = ({ classes }) => {
  return (
    <footer className={classes.root}>
    </footer>
  );
};

const styles = {
  root: {
    zIndex: 2,
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    margin: "0px",
    display: "block",
    height: "250px"
    }
};

export default withStyles(styles)(Footer);
