import React from "react";
import injectSheet from "react-jss";

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
    margin: "auto",
    display: "block"
  },
  container: {
    height: "125px"
  }
};

export default injectSheet(styles)(Footer);
