import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import { useSpring, animated } from "react-spring";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const Piece = props => {
  const { classes, position } = props;

  const movement = useSpring({
    marginLeft: position === null ? "0%" : position === 0 ? "110%" : "100%",
    from: {
      marginLeft: "0%"
    },
    config: { tension: 200, friction: 40, mass: 1 }
  });

  return <animated.div style={movement} className={classes.gamePiece} />;
};

const styles = {
  gamePiece: props => ({
    position: "absolute",
    width: "5px",
    border: "0l.5px solid rgb(0, 0, 0, .6)",
    left: props.position === null ? -6 : -2,
    opacity: 1,
    zIndex: 50,
    boxShadow: "0 0 1px rgb(0, 0, 0, .5)",
    height: "90%",
    backgroundColor: props.color,
    borderRadius: 2
  })
};

Piece.propTypes = propTypes;

export default withStyles(styles)(Piece);
