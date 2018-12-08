import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import injectSheets from "react-jss";

import CommonTitle from "../CommonComponents/commonTitle";
import CommonText from '../CommonComponents/commonText'

const propTypes = {
  navPath: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

const DashboardPlayCard = props => {
  const { navPath, classes, title, text, handleOnClick } = props;

  return (
    <Fragment>
      <Link className={classes.card} to={navPath} onClick={handleOnClick}>
        <CommonTitle color={'#fff'}>{title}</CommonTitle>
        <CommonText color={'#fff'} className={classes.itemText}>{text}</CommonText>
      </Link>
    </Fragment>
  );
};

const styles = theme => ({
  card: {
    display: "flex",
    flex: [1, 1, "100%"],
    flexDirection: "column",
    justifyContent: "right",
    position: "relative",
    cursor: "pointer",
    margin: 15,
    padding: "40px 40px 40px 40px",
    backgroundColor: props => props.backgroundColor,
    textDecoration: "none",
    borderRadius: 8,
    transitionDuration: ".15s",
    boxShadow: "0 13px 27px -5px rgba(50,50,93,.25), 0 8px 16px -8px rgba(0,0,0,.3)",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 30px 60px -12px rgba(50,50,93,.25),0 18px 36px -18px rgba(0,0,0,.3)"
    }
  }
});

DashboardPlayCard.propTypes = propTypes;

export default injectSheets(styles)(DashboardPlayCard);
