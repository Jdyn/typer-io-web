import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import injectSheets from "react-jss";

const propTypes = {
  navigatePath: PropTypes.string.isRequired,
  itemTitle: PropTypes.string.isRequired,
  itemText: PropTypes.string.isRequired
};

const DashboardPlayCard = props => {
  const { navPath, classes, title, text, route } = props;

  return (
    <Fragment>
      <Link className={classes.card} to={navPath}>
        <h2 className={classes.itemTitle}>{title}</h2>
        <p className={classes.itemText}>{text}</p>
      </Link>
    </Fragment>
  );
};

const styles = theme =>({
  card: {
    display: "flex",
    flex: [1, 1, "100%"],
    flexDirection: "column",
    justifyContent: 'right',
    position: "relative",
    cursor: "pointer",
    margin: 15,
    padding: "40px 40px 40px 40px",
    backgroundColor: props => props.color,
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
  itemTitle: {
    margin: [0, 0, "5px"],
    whiteSpace: "normal",
    fontSize: 18,
    lineHeight: "15px",
    color: '#fff',
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: ".025em"
  },
  itemText: {
    margin: ["5px", 0, 0],
    fontWeight: 400,
    fontSize: 17,
    width: '240px',
    color: '#fff',
    lineHeight: "15px"
  }
});

DashboardPlayCard.propTypes = propTypes;

export default injectSheets(styles)(DashboardPlayCard)