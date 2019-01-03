import React from "react";
import injectSheet from "react-jss";
import { Spring } from "react-spring";
const GamePiece = props => {
  const { classes } = props;

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
};

const styles = {
  container: {
    display: "flex",
    position: "absolute",
    flexDirection: "column",
  },
  circle: {
    width: "8px",
    height: "8px",
    backgroundColor: "black",
    borderRadius: "50%"
  },
  line: {
    width: "4px",
    height: "8px",
    margin: "0px auto 0px auto",
    backgroundColor: "black"
  }
};

export default injectSheet(styles)(GamePiece);
