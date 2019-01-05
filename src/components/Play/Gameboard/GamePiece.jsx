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

const styles = theme => ({
  container: {
    display: "flex",
    position: "absolute",
    flexDirection: "column"
    // width: "100%"
  },
  circle: {
    width: "12px",
    height: "12px",
    // margin: "0 3px 0 3px",
    borderRadius: "50%",
    backgroundColor: props => props.color,
    boxShadow: "0px 0px 3px rgba(50,50,93,.25)",

  },
  line: {
    width: "4px",
    height: "18px",
    margin: "0 auto 0 auto",
    backgroundColor: props => props.color,
    boxShadow: "0px 0px 2px rgba(50,50,93,.25)",
  }
});

export default injectSheet(styles)(GamePiece);
