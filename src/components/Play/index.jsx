import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import ClientList from "./ClientList";
import Gameboard from "./Gameboard";
import Editor from "./Editor";
import Chat from "./Chat";
import Paper from "../Common/Paper";
import ListHeader from "./ListHeader";

const propTypes = {
  client: PropTypes.object.isRequired,
  room: PropTypes.object.isRequired,
  gameboard: PropTypes.object.isRequired,
  socket: PropTypes.object.isRequired,
  updateClient: PropTypes.func.isRequired,
  initSocket: PropTypes.func.isRequired,
  leaveRoom: PropTypes.func.isRequired,
  sendChatMessage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const Play = props => {
  const [clientIndex, setClientIndex] = useState(null);
  const [header, setHeader] = useState({
    color: "#469cd0",
    text: "Looking for Players..."
  });
  const {
    client,
    room,
    socket,
    gameboard,
    leaveRoom,
    sendChatMessage,
    classes
  } = props;

  useEffect(() => {
    return () => {
      leaveRoom({ id: room.id });
    };
  }, []);

  useEffect(
    () => {
      updateHeader();
    },
    [room.roomTime, socket]
  );

  const timeRemaining = () => {
    const roomTime = room.roomTime;
    if (roomTime) {
      const text = roomTime.substring(roomTime.length - 2, roomTime.length);
      const seconds = parseInt(text);
      return seconds;
    }
  };

  const updateHeader = () => {
    const time = timeRemaining();

    if (time > 10) {
      setHeader({ color: "#469cd0", text: "Looking for Players..." });
    } else if (time > 5) {
      setHeader({ color: "#e57373", text: "Get Ready..." });
    } else if (time > 0) {
      setHeader({ color: "#e5a03e", text: "Get Set..." });
    } else if (time === 0) {
      setHeader({ color: "#81C784", text: "GO!" });
    } else if (socket.connected) {
      setHeader({ color: "#469cd0", text: "Looking for Players..." });
      return;
    } else if (socket.errored) {
      setHeader({ color: "#e57373", text: "Connection error occured" });
      return;
    } else {
      setHeader({ color: "#469cd0", text: "Connecting to server..." });
    }
  };

  return (
    <main>
      <div className={classes.stripe} />
      <div className={classes.root}>
        <ClientList room={room} gameboard={gameboard} socket={socket} />

        <div className={classes.gameState}>
          <ListHeader
            header={header}
            gameTime={gameboard.gameTime}
            roomTime={room.roomTime}
          />
        </div>
        <Gameboard
          clientIndex={clientIndex}
          client={client}
          room={room}
          gameboard={gameboard}
        />
        <Chat client={client} room={room} sendChatMessage={sendChatMessage} />
        <Editor
          client={client}
          room={room}
          gameboard={gameboard}
          gameboardUpdate={setClientIndex}
        />
      </div>
    </main>
  );
};

Play.propTypes = propTypes;

const styles = theme => ({
  root: {
    display: "grid",
    gridTemplateColumns: "min-content auto min-content",
    gridTemplateRows: "min-content min-content min-content",
    maxWidth: "1240px",
    flexDirection: "row",
    position: "relative",
    margin: "auto",
    height: "100%"
  },
  stripe: {
    zIndex: 0,
    width: "100%",
    height: "90%",
    overflow: "hidden",
    WebkitTransform: "skwY(-12deg)",
    transform: "skewY(-12deg)",
    WebkitTransformOrigin: 0,
    transformOrigin: 0,
    backgroundColor: theme.tertiaryWhite,
    position: "absolute"
  },
  gameState: {
    position: "relative",
    gridRow: "1 / 2",
    gridColumn: "1 / 2",
    width: "275px"
  }
});

export default withStyles(styles)(Play);
