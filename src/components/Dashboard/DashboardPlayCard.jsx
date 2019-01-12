import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import injectSheets from "react-jss";
import Header from "../Common/Header";
import Content from "../Common/Content";

const propTypes = {
  navPath: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

const DashboardPlayCard = props => {
  const { onClick, classes, title, text } = props;
  return (
    <Fragment>
      <button className={classes.card} onClick={onClick}>
        <Header color="#fff">{title}</Header>
        <Content className={classes.itemText} color={"#fff"} fontSize={18}>
          {text}
        </Content>
        {props.pending && <div>LOADING</div>}
      </button>
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
    minWidth: "300px",
    margin: 15,
    padding: "40px 40px 40px 40px",
    backgroundColor: props => props.backgroundColor,
    textDecoration: "none",
    borderRadius: 8,
    transitionDuration: ".15s",
    border: "none",
    boxShadow:
      "0 13px 27px -5px rgba(50,50,93,.25), 0 8px 16px -8px rgba(0,0,0,.3)",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow:
        "0 30px 60px -12px rgba(50,50,93,.25),0 18px 36px -18px rgba(0,0,0,.3)"
    }
  }
});

DashboardPlayCard.propTypes = propTypes;

export default injectSheets(styles)(DashboardPlayCard);
