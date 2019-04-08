import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import { Link } from "react-router-dom";
const propTypes = {
  classes: PropTypes.object.isRequired
};

const Header = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <span className={classes.logo}>
          <Link to="/">typer.io</Link>
        </span>
        <ul className={classes.nav}>
          <li>
            <Link to="/">home</Link>
          </li>
          <li>
            <Link to="/">discussion</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

const styles = theme => ({
  root: {
    position: "relative",
    height: "75px",
    zIndex: 500,
    paddingTop: "3px",
    overflow: "hidden",
    backgroundColor: theme.accent,
    boxShadow: "0 5px 10px 0px rgba(35,35,80,.4)",
    borderBottom: "3px solid rgb(0,0,0,.1)",
  },
  container: {
    display: "flex",
    position: "relative",
    width: "100%",
    height: "100%",
    margin: "0 auto",
    maxWidth: "1065px"
  },
  logo: {
    display: "Flex",
    alignItems: "center",
    fontSize: 36,
    margin: "0 15px",
    "& a": {
      color: theme.white,
      textDecoration: "none",
      // fontFamily: "DIN Next Rounded"
    }
  },
  nav: {
    display: "flex",
    flexDirection: "row",
    padding: 0,
    margin: 0,
    marginLeft: "15px",
    listStyle: "none",
    "& li": {
      display: "flex",
      alignItems: "center",
      fontSize: 15,
      fontWeight: 700,
      letterSpacing: ".8px",
      textTransform: "uppercase",
      margin: "0 15px",
      "& a": {
        textDecoration: "none",
        color: theme.white
      }
    }
  }
});

Header.propTypes = propTypes;

export default withStyles(styles)(Header);
