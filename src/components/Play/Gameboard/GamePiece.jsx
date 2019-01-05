import React from "react";
import injectSheet from "react-jss";
import { Spring } from "react-spring";
const GamePiece = props => {
  const { classes, index } = props;

  if (index !== null) {
    return (
      <Spring from={{ marginLeft: "0%" }} to={{ marginLeft: "100%" }}>
        {props => (
          <div style={props} className={classes.container}>
            <div className={classes.circle} />
            <div className={classes.line} />
          </div>
        )}
      </Spring>
    );
  } else {
    return (
      <div style={props} className={classes.container}>
        <div className={classes.circle} />
        <div className={classes.line} />
      </div>
    );
  }
};

const styles = {
  container: {
    display: "flex",
    position: "absolute",
    flexDirection: "column"
    // width: "100%"
  },
  circle: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: props => props.color ? props.color : "red"
  },
  line: {
    width: "4px",
    height: "18px",
    margin: "0 auto 0 auto",
    backgroundColor: props => props.color ? props.color : "red"
  }
};

export default injectSheet(styles)(GamePiece);
