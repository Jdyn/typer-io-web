import React from "react";
import injectSheet from "react-jss";

const ClientListHeader = props => {
  const { classes, client, headerInfo } = props;

  return (
    <div className={classes.container} color="black" padding="20px">
      <div className={classes.time}>{client.room.gameboard.gameTime ? client.room.gameboard.gameTime : client.room.timer}</div>
      <div className={classes.infoText}>{headerInfo.text}</div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    margin: "0px",
    fontSize: "18px",
    color: "black",
		borderRadius: "8px 8px 0px 0px",
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
