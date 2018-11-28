import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import injectSheets from "react-jss";

const propTypes = {
  navigatePath: PropTypes.string.isRequired,
  itemTitle: PropTypes.string.isRequired,
  itemText: PropTypes.string.isRequired
};

const DashboardPlayItem = props => {
  const { navigatePath, classes, itemTitle, itemText } = props;

  return (
    <div className={classes.container}>
      <Link className={classes.card} to={navigatePath}>
        <h2 className={classes.itemTitle}>{itemTitle}</h2>
        <p className={classes.itemText}>{itemText}</p>
      </Link>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    margin: ["20px", "auto"],
    padding: ["5px", "5px"],
    maxWidth: "1160px",
    backgroundColor: theme.primaryWhite
  },
  card: {
    display: "flex",
    flex: [1, 1, "100%"],
    flexDirection: "column",
    position: "relative",
    cursor: "pointer",
    margin: 15,
    padding: "40px 40px 40px 40px",
    backgroundColor: theme.primaryWhite,
    color: "black",
    textDecoration: "none",
    borderRadius: 8,
    transitionDuration: ".15s",
    boxShadow:
      "0 13px 27px -5px rgba(50,50,93,.25), 0 8px 16px -8px rgba(0,0,0,.3)",

    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow:
        "0 30px 60px -12px rgba(50,50,93,.25),0 18px 36px -18px rgba(0,0,0,.3)"
    }
  },
  text: {
    margin: ["5px", 0, 0],
    fontWeight: 400,
    fontSize: 17,
    fontFamily: ["Camphor", "Open Sans", "Segoe UI", "sans-serif"]
  }
};

DashboardPlayItem.propTypes = propTypes;
