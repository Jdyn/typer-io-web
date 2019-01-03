import React from "react";
import injectSheet from "react-jss";

const GamePiece = props => {
  const { classes } = props
  return (
    <div className={classes.container}>
      <div className={classes.circle} />
      <div className={classes.line}></div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    position: "relative",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "Center"
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
    backgroundColor: "black",

  }
};

export default injectSheet(styles)(GamePiece);
