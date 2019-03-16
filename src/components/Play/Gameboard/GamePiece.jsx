import React from "react";
import withStyles from "react-jss";
import { useSpring, animated } from "react-spring";

const GamePiece = props => {
  const { classes, index } = props;

  const spring = useSpring({ marginLeft: "100%", from: { marginLeft: "0%" } });

  if (index !== null) {
    return (
      <animated.div style={spring} className={classes.container}>
        <div className={classes.circle} />
        <div className={classes.line} />
      </animated.div>
    );
  } else {
    return (
      <div className={classes.container}>
        <div className={classes.circle} />
        <div className={classes.line} />
      </div>
    );
  }
};

const styles = theme => ({
  container: {
    display: "flex",
    position: "absolute",
    flexDirection: "column",
    bottom: "5px",
    top: 0,
    opacity: props => props.opacity
  },
  circle: {
    width: "14px",
    position: "relative",
    height: "14px",
    borderRadius: "50%",
    backgroundColor: props => props.color,
    boxShadow: "0px 0px 5px rgba(50,50,93,.25)",
  },
  line: {
    width: "6px",
    height: "20px",
    margin: "-1px auto 0 auto",
    backgroundColor: props => props.color,
    boxShadow: "0px 0px 5px rgba(50,50,93,.25)",
    borderRadius: " 0px 0px 2px 2px",
  }
});

export default withStyles(styles)(GamePiece);
