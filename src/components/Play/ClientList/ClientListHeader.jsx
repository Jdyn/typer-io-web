import React from "react";
import injectSheet from "react-jss";

const ClientListHeader = props => {
  const { classes, client } = props;

  return (
    <div className={classes.container} color="black" padding="20px">
      <div className={classes.time}>{client.room.gameboard.gameTime}</div>
      <div className={classes.infoText}>Looking for Players...</div>
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
		borderRadius: 8,
		backgroundColor: props => props.headerInfo.backgroundColor ? props.headerInfo.backgroundColor : "#469cd0",
    padding: "20px",
    fontWeight: 600,
    textAlign: "center"
  }
};

export default injectSheet(styles)(ClientListHeader);
