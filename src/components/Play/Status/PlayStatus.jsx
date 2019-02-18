import React, { useState } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import PlayStatusCard from "./PlayStatusCard";

const propTypes = {
  classes: PropTypes.object.isRequired,
  gameboard: PropTypes.object.isRequired,
  room: PropTypes.object.isRequired,
  socket: PropTypes.object.isRequired
};

const PlayStatus = props => {
  const { classes, gameboard, room, socket } = props;
  const [viewType, setViewType] = useState("ROOM_TYPE");

  const renderHeader = type => {
    switch (type) {
      case "ROOM_TYPE":
        return updateRoomView();
      case "GAME_TYPE":
        return updateGameView();
      default:
      return { color: "#e57373", text: socket.error ? socket.error : "Connection error occured" };
    }
  };

  const updateRoomView = () => {
    const time = getTime(viewType);
    if (time !== null) {
      if (time > 10) {
        return { color: "#469cd0", text: "Looking for Players..." };
      } else if (time > 5) {
        return { color: "#e5a03e", text: "Get Ready..." };
      } else if (time > 0) {
        return { color: "#e57373", text: "Get Set..." };
      } else if (time === 0) {
        setViewType("GAME_TYPE");
      }
    } else {
      if (socket.connected) {
        return { color: "#469cd0", text: "Looking for Players..." };
      } else if (socket.errored) {
        return { color: "#e57373", text: socket.error ? socket.error : "Connection error occured" };
      }
      return { color: "#469cd0", text: "Connecting to server..." };
    }
  };

  const updateGameView = () => {
    const time = getTime(viewType);
    if (!gameboard.isOver) {
      if (time !== null) {
        if (time === 0) {
          return { color: "#555abf", text: "Game has Ended" };
        } else if (time < 10) {
          return { color: "#81C784", text: "GO!" };
        } else if (time < 20) {
          return { color: "#81C784", text: "GO!" };
        }
      } else {
        if (socket.errored) {
          return { color: "#e57373", text: socket.error ? socket.error : "Connection error occured" };
        }
      }
    } else {
      return { color: "#555abf", text: gameboard.text };
    }

    return { color: "#81C784", text: "GO!" };
  };

  const getTime = type => {
    switch (type) {
      case "ROOM_TYPE":
        const { roomTime } = room;
        if (roomTime) {
          const seconds = roomTime.substring(
            roomTime.length - 2,
            roomTime.length
          );
          return parseInt(seconds);
        }
        return null;
      case "GAME_TYPE":
        const { gameTime } = gameboard;
        if (gameTime) {
          const minutes = gameTime.substring(1, 2);
          const seconds = gameTime.substring(
            gameTime.length - 2,
            gameTime.length
          );
          return parseInt(seconds) + parseInt(minutes) * 60;
        }
        return null;
      default:
        return null;
    }
  };

  return (
    <div className={classes.container}>
      <PlayStatusCard
        header={renderHeader(viewType)}
        gameTime={gameboard.gameTime}
        roomTime={room.roomTime}
      />
    </div>
  );
};

PlayStatus.propTypes = propTypes;

const styles = {
  container: {
    position: "relative",
    gridRow: "2 / 3",
    gridColumn: "1 / 2",
    margin: 0//"0px 0px 10px 0px"
  }
};

export default withStyles(styles)(PlayStatus);
