import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";

const propTypes = {
  classes: PropTypes.object.isRequired,
  gameboard: PropTypes.object.isRequired,
  room: PropTypes.object.isRequired,
  socket: PropTypes.object.isRequired
};

const states = {
  room: "ROOM",
  game: "GAME"
};

const PlayStatus = props => {
  const { classes, gameboard, room, socket } = props;
  const [state, setState] = useState(states.room);
  const [header, setHeader] = useState({
    color: "#469cd0",
    text: "Connecting to server..."
  });

  useEffect(() => {
    setHeader(updateHeader());
  }, [gameboard, state, socket, room.roomTime]);

  const updateHeader = () => {
    const time = getTime(state);

    if (socket.connected && !gameboard.isOver) {
      if (time > 10) {
        return gameboard.isStarted
          ? { color: "#81C784", text: "GO!" }
          : { color: "#1c91ff", text: "Looking for Players..." };
      } else if (time > 5) {
        return gameboard.isStarted
          ? { color: "#e5a03e", text: "GO!" }
          : { color: "#e5a03e", text: "Get Ready..." };
      } else if (time > 0) {
        return gameboard.isStarted
          ? { color: "#e57373", text: "GO!" }
          : { color: "#e57373", text: "Get Set..." };
      } else {
        return gameboard.isStarted
          ? { color: "#81C784", text: "GO!" }
          : { color: "#1c91ff", text: "Looking for Players..." };
      }
    } else if (gameboard.isOver) {
      return { color: "#555abf", text: "Game has Ended" };
    }

    if (socket.errored) {
      return { color: "#e57373", text: socket.error ? socket.error : "Connection error occured" };
    } else if (!socket.connected) {
      return { color: "#469cd0", text: "Connecting to server..." };
    }

    return { color: "#81C784", text: "Calc" };
  };

  const getTime = state => {
    switch (state) {
      case states.room:
        const { roomTime } = room;
        if (roomTime) {
          const seconds = roomTime.substring(roomTime.length - 2, roomTime.length);
          const time = parseInt(seconds);
          if (time <= 0) {
            setState(states.game);
          }
          return time;
        }
        return null;
      case states.game:
        const { gameTime } = gameboard;
        if (gameTime) {
          const minutes = gameTime.substring(1, 2);
          const seconds = gameTime.substring(gameTime.length - 2, gameTime.length);
          return parseInt(seconds) + parseInt(minutes) * 60;
        }
        return null;
      default:
        return null;
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.inner} style={{ backgroundColor: header.color }}>
        <h3>{gameboard.gameTime || room.roomTime}</h3>
        <h3>{header.text}</h3>
      </div>
    </div>
  );
};

PlayStatus.propTypes = propTypes;

const styles = theme => ({
  container: {
    position: "relative",
    gridArea: "status",
    marginBottom: "15px"
  },
  inner: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    height: "100%",
    fontSize: "18px",
    color: theme.primary,
    boxShadow: "0px 1px 15px 0px rgba(50,50,93,.4)",
    borderRadius: "8px",
    border: "3px solid rgba(0,0,0,.1)",
    transition: "background-color 0.5s",
    padding: "30px 0px",
    textAlign: "center",
    "& h3": {
      margin: 0,
      fontSize: 20,
      height: "25px",
      lineHeight: "25px",
      fontWeight: 600
    }
  }
});

export default withStyles(styles)(PlayStatus);
