import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import ClientList from "./ClientList";
import Gameboard from "./Gameboard";
import Editor from "./Editor";
import Chat from "./Chat";
import PlayStatus from "./Status";
import Leaderboard from "./Leaderboard";
import Context from "./Content";

const propTypes = {
  classes: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  room: PropTypes.object.isRequired,
  gameboard: PropTypes.object.isRequired,
  socket: PropTypes.object.isRequired,
  initSocket: PropTypes.func.isRequired,
  leaveRoom: PropTypes.func.isRequired,
  sendChatMessage: PropTypes.func.isRequired
};

const Play = props => {
  const {
    client,
    room,
    snippet,
    socket,
    gameboard,
    leaveRoom,
    saveMatch,
    sendChatMessage,
    classes
  } = props;

  const [clientIndex, setClientIndex] = useState(null);
  const [currentGamePiece, setGamePiece] = useState(null);

  const gamePiece = room.clients[0]
    ? room.clients.filter(object => object.id === client.id)[0].gamePiece
    : {};

  useEffect(() => {
    return () => {
      leaveRoom({ id: room.id, errored: false });
    };
  }, []);

  useEffect(() => {
    if (gamePiece && gamePiece.isComplete) {
      saveMatch(gamePiece, snippet);
    }
  }, [gamePiece.isComplete]);

  return (
    <main>
      <div className={classes.stripe} />
      <div className={classes.root}>
        <ClientList room={room} gameboard={gameboard} socket={socket} />
        <PlayStatus gameboard={gameboard} room={room} socket={socket} />
        <Leaderboard />
        <Gameboard
          clientIndex={clientIndex}
          client={client}
          room={room}
          gameboard={gameboard}
        />
        <Editor
          client={client}
          room={room}
          gameboard={gameboard}
          gameboardUpdate={setClientIndex}
        />
        <Chat client={client} room={room} sendChatMessage={sendChatMessage} />
      </div>
    </main>
  );
};

Play.propTypes = propTypes;

const styles = theme => ({
  root: {
    display: "grid",
    gridTemplateColumns: "265px auto 265px",
    gridTemplateRows: "min-content min-content auto",
    gridGap: "20px",
    maxWidth: "1185px",
    flexDirection: "row",
    position: "relative",
    margin: "auto",
    height: "100%"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    gridRow: "2 / 5",
    gridColumn: "3 / 4"
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gridRow: "2 / 5",
    gridColumn: "3 / 4"
  },
  stripe: {
    zIndex: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    WebkitTransform: "skwY(-12deg)",
    transform: "skewY(-12deg)",
    WebkitTransformOrigin: 0,
    transformOrigin: 0,
    backgroundColor: theme.tertiaryWhite,
    position: "absolute"
  }
});

export default withStyles(styles)(Play);
