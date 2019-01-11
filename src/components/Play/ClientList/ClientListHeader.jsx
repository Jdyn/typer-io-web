import React from "react";
import injectSheet from "react-jss";

const ClientListHeader = props => {
  const { classes, gameTime, roomTime, headerInfo } = props;

  return (
    <div className={classes.container}>
      <div className={classes.time}>{gameTime ? gameTime : roomTime}</div>
      <div className={classes.infoText}>{headerInfo.text}</div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    width: "100%",
    margin: "0px",
    fontSize: "18px",
    color: "black",
    boxShadow: "0px 5px 30px 5px rgba(50,50,93,.25)",
    marginBottom: "25px",
    borderRadius: "8px",
    transition: "background-color 1s",
    backgroundColor: props =>
      props.headerInfo.backgroundColor
        ? props.headerInfo.backgroundColor
        : "#469cd0",
    padding: "20px",
    fontWeight: 600,
    textAlign: "center"
  },
  time: {
    color: "white",
    height: "25px"
  },
  infoText: {
    color: "white"
  }
};

export default injectSheet(styles)(ClientListHeader);
