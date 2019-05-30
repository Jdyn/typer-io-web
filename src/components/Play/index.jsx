import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import ClientList from "./ClientList";
import Gameboard from "./Gameboard";
import Chat from "./Chat";
import { silentEmit } from "../../services/socket";
import PlayStatus from "./Status";
import Leaderboard from "./leaderboard";
import Editor from "./Gameboard/Editor";

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
  const { client, room, socket, gameboard, leaveRoom, sendChatMessage, classes } = props;

  const [gameState, setGameState] = useState({
    currentInput: "",
    currentWord: "",
    currentIndex: 0,
    words: [],
    wordsRemaining: [],
    wordsComplete: []
  });

  const [editorState, setEditorState] = useState({
    key: null,
    wrongIndex: null,
    entries: 0,
    errors: 0
  });

  // When the component unmounts, signal the server that the client is leaving.
  useEffect(() => {
    return () => {
      leaveRoom({ id: room.id, errored: false });
    };
  }, []);

  // Once the quote has loaded, update the gameboard accordingly.
  useEffect(() => {
    setGameState({
      ...gameState,
      currentWord: gameboard.words[0] || "",
      currentIndex: 0,
      words: gameboard.words,
      wordsRemaining: gameboard.words,
      wordsComplete: []
    });
  }, [gameboard.words]);

  const inputDidUpdate = event => {
    setGameState({ ...gameState, currentInput: event.target.value });
  };

  const submitWord = () => {
    const { wordsRemaining, words, currentIndex } = gameState;
    const temp = [...wordsRemaining];
    const removed = temp.shift();

    // + 1 includes the space key
    const newEntries = words[currentIndex].length + 1;
    const newIndex = currentIndex;

    const timestamp = Date.now();

    const payload = {
      entries: newEntries,
      position: newIndex,
      errors: editorState.errors,
      timestamp
    };

    silentEmit("CLIENT_UPDATE", payload);

    setGameState(prev => ({
      ...gameState,
      currentInput: "",
      currentIndex: prev.currentIndex + 1,
      currentWord: prev.words[prev.currentIndex + 1],
      wordsRemaining: temp,
      wordsComplete: [...prev.wordsComplete, removed]
    }));
  };

  return (
    <>
      <div className={classes.stripe} />
      <div className={classes.root}>
        <ClientList room={room} gameboard={gameboard} socket={socket} />
        <PlayStatus gameboard={gameboard} room={room} socket={socket} />
        <Leaderboard snippet={room.snippet} />
        <Gameboard
          gameState={gameState}
          editorState={editorState}
          client={client}
          room={room}
          gameboard={gameboard}
          setEditorState={setEditorState}
          inputDidUpdate={inputDidUpdate}
          submitWord={submitWord}
        />
        <Chat client={client} room={room} sendChatMessage={sendChatMessage} />
        <Editor
          gameboard={gameboard}
          gameState={gameState}
          setEditorState={setEditorState}
          isWrong={editorState.wrongIndex !== null}
          inputDidUpdate={inputDidUpdate}
          submitWord={submitWord}
        />
      </div>
    </>
  );
};

Play.propTypes = propTypes;

const styles = theme => ({
  root: {
    display: "grid",
    gridTemplateColumns: "275px auto 275px",
    gridTemplateRows: "min-content min-content auto 1fr",
    gridTemplateAreas: `
    'clientlist  clientlist clientlist'
    'status      gameboard  chat'
    'leaderboard gameboard  chat'
    'leaderboard editor     chat'
    `,
    maxWidth: "1105px",
    flexDirection: "row",
    position: "relative",
    padding: "15px",
    margin: "75px auto 115px auto",
    height: "100%"
  },
  stripe: {
    zIndex: -1,
    width: "100%",
    height: "85%",
    overflow: "hidden",
    WebkitTransform: "skwY(-12deg)",
    transform: "skewY(-12deg)",
    WebkitTransformOrigin: 0,
    transformOrigin: 0,
    backgroundColor: theme.tertiary,
    position: "absolute"
  }
});

export default withStyles(styles)(Play);
