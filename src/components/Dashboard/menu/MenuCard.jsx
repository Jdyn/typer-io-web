import React from "react";
import withStyless from "react-jss";
import PropTypes from "prop-types";

const propTypes = {
  classes: PropTypes.object.isRequired,
  card: PropTypes.object.isRequired,
  socket: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  currentIndex: PropTypes.number
};

const MenuCard = props => {
  const { classes, card, socket, onClick, index, currentIndex } = props;

  return (
    <button className={classes.container} onClick={e => onClick(e, index)}>
      <h2>{card.title}</h2>
      <span>{card.text}</span>

      {currentIndex === index ? (
        socket.pending ? (
          <span>Connecting to server...</span>
        ) : (
          <span>{socket.errored && socket.error}</span>
        )
      ) : (
        <span />
      )}
    </button>
  );
};

const styles = theme => ({
  container: props => ({
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    position: "relative",
    cursor: "pointer",
    marginBottom: "14px",
    outline: "none",
    padding: "35px",
    justifyContent: "center",
    backgroundColor: props.card.color,
    color: theme.white,
    textAlign: "left",
    border: "3px solid rgba(0,0,0,.1)",
    borderRadius: 16,
    transitionDuration: ".15s",
    boxShadow: "0 13px 27px -5px rgba(30,30,70,.4), 0 8px 16px -8px rgba(0,0,0,.3)",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 30px 60px -12px rgba(30,30,70,.4),0 18px 36px -18px rgba(0,0,0,.3)"
    },
    "&:active": {
      transform: "translateY(2px)"
    },
    "&:last-child": {
      marginBottom: 0
    },
    "& h2": {
      margin: 0,
      fontSize: 20,
      fontWeight: 700,
      height: "20px",
      marginBottom: "5px"
    },
    "& span": {
      height: "20px",
      fontSize: 17
    }
  })
});

MenuCard.propTypes = propTypes;

export default withStyless(styles)(MenuCard);
