import React from "react";
import PropTypes from "prop-types";
import withStyless from "react-jss";
import Header from "../Common/Header";
import Content from "../Common/Content";

const propTypes = {
  classes: PropTypes.object.isRequired,
  card: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  socket: PropTypes.object.isRequired
};

const MenuCard = props => {
  const { onClick, classes, card, socket, index, selectedIndex } = props;

  return (
    <button className={classes.card} onClick={e => onClick(e, index)}>
      <Header border="none" color="#fff">
        {card.title}
      </Header>
      <Content className={classes.itemText} color={"#fff"} fontSize={20}>
        {card.text}
      </Content>

      {selectedIndex === index ? (
        socket.pending === true ? (
          <div className={classes.loader}>LOADING</div>
        ) : (
          <div className={classes.loader}>
            {socket.errored ? (
              <div>
                Error connecting to server <br /> Try again
              </div>
            ) : (
              "Unexpected Error..."
            )}
          </div>
        )
      ) : (
        <div className={classes.loader} />
      )}
    </button>
  );
};

const styles = theme => ({
  card: props => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    position: "relative",
    cursor: "pointer",
    width: "315px",
    margin: "15px 0",
    fontWeight: 600,
    outline: "none",
    padding: "40px",
    backgroundColor: props.card.color,
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
    },
    "&:first-child": {
      marginTop: 0
    },
    "&:last-child": {
      marginBottom: 0
    }
  }),
  loader: {
    height: "6px",
    color: "#fff",
    fontWeight: 600
  }
});

MenuCard.propTypes = propTypes;

export default withStyless(styles)(MenuCard);
