import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import { useSpring, animated } from "react-spring";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const Piece = props => {
  const { classes, index } = props;

  const movement = useSpring({
    marginLeft: "100%",
    from: {
      marginLeft: "0%"
    },  
    config: {tension: 400, friction: 35, mass: 1}
  });

  return index === null ? (
    <div className={classes.gamePiece} />
  ) : (
    <animated.div style={movement} className={classes.gamePiece} />
  );
};

const styles = {
  gamePiece: props => ({
    position: "absolute",
    width: "5px",
    border: "1px solid rgb(0, 0, 0, .5)",
    left: -2,
    opacity: 0.8,
    zIndex: 25,
    boxShadow: "0 0 1px rgb(0, 0, 0, .5)",
    height: "90%",
    backgroundColor: props.color,
    borderRadius: 2,

  })
};

Piece.propTypes = propTypes;

export default withStyles(styles)(Piece);
