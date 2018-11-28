import React from "react";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

const Nav = props => {
  const { classes } = props;

  return (
    <header className={classes.root}>
      <nav className={classes.container}>
        <ul className={classes.list}>
          <li className={classes.listItem}>
            <button className={classes.listItemTitle}>text</button>
          </li>
          <li>
            <button className={classes.listItemTitle}>text</button>
          </li>
          <li>
            <button className={classes.listItemTitle}>text</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

const styles = theme => ({
  root: {
    position: "relative",
    top: 0,//"10px",
    left: 0,
    right: 0,
    margin: "auto",
    display: "block"
  },

  container: {
    margin: [0, "auto"],
    padding: 0,
    boxShadow: '0 5px 20px rgba(50,50,93,.25)',
    borderRadius: 0
  },

  list: {
    display: "flex",
    justifyContent: "center",
    listStyle: "none",
    margin: 0,
    padding: 0
  },
  listItemTitle: {
    background: "transparent",
    border: 0,
    height: "50px",
    fontWeight: "500",
    fontSize: 17,
    color: "black",
    padding: [0, "25px"],
    display: "flex",
    justifyContent: "center",
    cursor: "pointer",
    position: "relative",
    "&:hover, &:focus": {
      opacity: 0.7,
      outline: "none"
    }
  }
});

export default injectSheet(styles)(Nav);
