import React from "react";
import PropTypes from "prop-types";
import withStyless from "react-jss";

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
      <h2>{card.title}</h2>
      <span>{card.text}</span>

      {selectedIndex === index ? (
        socket.pending === true ? (
          <div className={classes.loader}>Connecting to server...</div>
        ) : (
          <div className={classes.loader}>
            {socket.errored ? (
              <div>
                {socket.error}
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
    flexGrow: 1,
    font: "none",
    position: "relative",
    cursor: "pointer",
    margin: "7.5px 0",
    fontWeight: 500,
    outline: "none",
    padding: "40px",
    backgroundColor: props.card.color,
    border: "3px solid rgba(0,0,0,.1)",
    borderRadius: 8,
    transitionDuration: ".15s",
    boxShadow: "0 13px 27px -5px rgba(50,50,93,.25), 0 8px 16px -8px rgba(0,0,0,.3)",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 30px 60px -12px rgba(50,50,93,.25),0 18px 36px -18px rgba(0,0,0,.3)"
    },
    "&:active": {
      transform: "translateY(2px)"
    },
    "&:first-child": {
      marginTop: 0
    },
    "&:last-child": {
      marginBottom: 0
    },
    "& span": {
      color: "#fff",
      fontSize: 18,
      fontWeight: 500,
      lineHeight: "20px",
      textAlign: "left"
    },
    "& h2": {
      margin: 0,
      fontSize: 20,
      fontWeight: 700,
      lineHeight: "22px",
      marginBottom: "5px",
      color: "#fff",
      textAlign: "left"
    }
  }),
  loader: {
    height: "6px",
    color: "#fff",
    fontWeight: 500,
    fontSize: 18,
  }
});

MenuCard.propTypes = propTypes;

export default withStyless(styles)(MenuCard);
