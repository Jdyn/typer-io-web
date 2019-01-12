import React from "react";
import injectSheet from "react-jss";
import ClientListCard from "./ClientListCard";
// import ListLoadingCard from "./ListLoadingCard";
import ClientListHeader from "./ClientListHeader";

const ClientList = props => {
  const { room, gameboard, classes } = props;
  const getTime = () => {
    const roomTime = room.roomTime;
    if (roomTime) {
      const text = roomTime.substring(roomTime.length - 2, roomTime.length);
      const seconds = parseInt(text);
      return seconds;
    }
  };

  const headerInfo = () => {
    const res = {};

    if (getTime() > 10) {
      res.backgroundColor = "#469cd0";
      res.text = "Looking for Players...";
    } else if (getTime() > 5) {
      res.backgroundColor = "#e57373";
      res.text = "Get Ready...";
    } else if (getTime() > 0) {
      res.backgroundColor = "#e5a03e";
      res.text = "Get Set...";
    } else if (getTime() === 0) {
      res.backgroundColor = "#81C784";
      res.text = "GO!";
    } else {
      res.backgroundColor = "#469cd0";
      res.text = "Looking for Players...";
    }
    return res;
  };

  return (
    <div className={classes.container}>
      <ClientListHeader
        gameTime={gameboard.gameTime}
        roomTime={room.roomTime}
        headerInfo={headerInfo()}
      />
      {room.id && (
        <div className={classes.inner}>
          {room.clients.map((client, index) => (
            <ClientListCard key={index} client={client} />
          ))}
        </div>
      )}
    </div>
  );
};

const styles = theme => ({
  container: {
    width: "265px",
    maxWidth: "265px",
    margin: "25px 15px 15px 15px",
    position: "relative",
    gridRow: "1 / 4"
  },
  inner: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    backgroundColor: theme.primaryWhite,
    boxShadow: "0px 5px 30px 5px rgba(50,50,93,.25)",
    borderRadius: 8
  }
});

export default injectSheet(styles)(ClientList);
