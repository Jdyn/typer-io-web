import React from "react";
import withStyles from "react-jss";
import { Link } from 'react-router-dom'
const Nav = props => {
  const { classes } = props;

  return (
    <header className={classes.root}>
      <nav className={classes.container}>
        <ul className={classes.list}>
          <li className={classes.listItem}>
            <Link to="/login" className={classes.listItemTitle}>login</Link>
          </li>
          <li>
            <button className={classes.listItemTitle}></button>
          </li>
          <li>
            <button className={classes.listItemTitle}></button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

const styles = theme => ({
  root: {
    zIndex: 2,
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
    backgroundColor: theme.primaryWhite,
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
    height: "65px",
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

export default withStyles(styles)(Nav);
