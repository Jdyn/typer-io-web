import React from "react";
import withStyles from "react-jss";

const Footer = ({ classes }) => {
  return <footer className={classes.root} />;
};

const styles = {
  root: {
    position: "relative",
    margin: "0px",
    height: "250px"
  }
};

export default withStyles(styles)(Footer);
