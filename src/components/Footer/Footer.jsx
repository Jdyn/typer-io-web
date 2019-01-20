import React from "react";
import withStyles from "react-jss";

const Footer = ({ classes }) => {
  return (
    <footer className={classes.root}>
      <article className={classes.container}>
        <ul>
        </ul>
      </article>
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
    // backgroundColor: 'red'
  },
  container: {
    height: "500px"
  }
};

export default withStyles(styles)(Footer);
