import React from "react";
import PropTypes from "prop-types";
import withStyless from "react-jss";
import Header from "../Common/Header";
import Content from "../Common/Content";

const propTypes = {
  classes: PropTypes.object.isRequired,
  card: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired
};

const DashboardPlayCard = props => {
  const { onClick, classes, card, pending } = props;
  return (
    <button className={classes.card} onClick={e => onClick(e, card.route)}>
      <Header border="none" color="#fff">
        {card.title}
      </Header>
      <Content className={classes.itemText} color={"#fff"} fontSize={18}>
        {card.text}
      </Content>
      {pending && <div>LOADING</div>}
    </button>
  );
};

const styles = theme => ({
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    position: "relative",
    cursor: "pointer",
    minWidth: "300px",
    margin: 15,
    fontWeight: 500,
    outline: "none",
    padding: "40px",
    backgroundColor: props => props.card.color,
    border: "1px solid rgba(0,0,0,.1)",
    borderRadius: 8,
    transitionDuration: ".15s",
    boxShadow:
      "0 13px 27px -5px rgba(50,50,93,.25), 0 8px 16px -8px rgba(0,0,0,.3)",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow:
        "0 30px 60px -12px rgba(50,50,93,.25),0 18px 36px -18px rgba(0,0,0,.3)"
    },
    "&:active": {
      transform: "translateY(2px)"
    }
  }
});

DashboardPlayCard.propTypes = propTypes;

export default withStyless(styles)(DashboardPlayCard);
