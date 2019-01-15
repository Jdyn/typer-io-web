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
    top: -5,
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

export default injectSheet(styles)(GamePiece);
