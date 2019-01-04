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
    flexDirection: "column"
    // width: "100%"
  },
  circle: {
    width: "8px",
    height: "8px",
    backgroundColor: "black",
    borderRadius: "50%",
  },
  line: {
    width: "4px",
    height: "18px",
    margin: "0 auto 0 auto",
    backgroundColor: "black"
  }
};

export default injectSheet(styles)(GamePiece);
