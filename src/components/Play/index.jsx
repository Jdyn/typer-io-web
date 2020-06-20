import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import ClientList from './ClientList';
import Gameboard from './Gameboard';
import Chat from './Chat';
import { silentEmit } from '../../services/socket';
import PlayStatus from './Status';
import Leaderboard from './leaderboard';
import Editor from './Gameboard/Editor';
import ReactGA from 'react-ga';

const propTypes = {
  classes: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  room: PropTypes.object.isRequired,
  gameboard: PropTypes.object.isRequired,
  socket: PropTypes.object.isRequired,
  initSocket: PropTypes.func.isRequired,
  leaveRoom: PropTypes.func.isRequired,
  sendChatMessage: PropTypes.func
};

const Play = (props) => {
  const { client, room, socket, gameboard, leaveRoom, sendChatMessage, classes, isSolo } = props;

  const [gameState, setGameState] = useState({
    currentInput: '',
    currentWord: '',
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

  useEffect(() => {
    if (gameboard.isStarted) {
      ReactGA.event({ category: 'game', action: 'game-started' });
    }
  }, [gameboard.isStarted]);

  // When the component unmounts, signal the server that the client is leaving.
  useEffect(() => {
    return () => {
      if (room.id !== null) {
        leaveRoom({ id: room.id, errored: false });
      }
    };
  }, [leaveRoom, room.id]);

  // Once the quote has loaded, update the gameboard accordingly.
  useEffect(() => {
    setGameState((prev) => ({
      ...prev,
      currentWord: gameboard.words[0] || '',
      currentIndex: 0,
      words: gameboard.words,
      wordsRemaining: gameboard.words,
      wordsComplete: []
    }));
  }, [gameboard.words, setGameState]);

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

    silentEmit('CLIENT_UPDATE', payload);
    setGameState((prev) => ({
      ...gameState,
      currentInput: '',
      currentIndex: prev.currentIndex + 1,
      currentWord: prev.words[prev.currentIndex + 1],
      wordsRemaining: temp,
      wordsComplete: [...prev.wordsComplete, removed]
    }));
  };

  const inputDidUpdate = (event) => {
    setGameState({ ...gameState, currentInput: event.target.value });

    if (gameState.wordsRemaining.length === 1) {
      if (event.target.value.trim() === gameState.currentWord) {
        document.getElementById('input').value = '';
        submitWord();
      }
    }
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
        {!isSolo && <Chat client={client} room={room} sendChatMessage={sendChatMessage} />}
        <Editor
          gameboard={gameboard}
          gameState={gameState}
          setEditorState={setEditorState}
          isWrong={editorState.wrongIndex !== null}
          inputDidUpdate={inputDidUpdate}
          submitWord={submitWord}
        />
        {!gameboard.isStarted && !gameboard.isOver ? (
          <span className={classes.notice}>
            Tip: Type the words in the box above when the game starts.
          </span>
        ) : null}
      </div>
    </>
  );
};

Play.propTypes = propTypes;

const styles = (theme) => ({
  root: (props) => ({
    display: 'grid',
    gridTemplateColumns: '275px auto 275px',
    gridTemplateRows: 'min-content min-content auto 1fr 75px',
    gridTemplateAreas: props.isSolo
      ? `
    'status gameboard leaderboard'
    'clientlist gameboard leaderboard'
    'clientlist editor leaderboard'
    '. notice .'
    `
      : `
    'clientlist  clientlist clientlist'
    'status      gameboard  chat'
    'leaderboard gameboard  chat'
    'leaderboard editor     chat'
    '. notice .'
    `,
    maxWidth: '1105px',
    flexDirection: 'row',
    position: 'relative',
    padding: '15px',
    margin: '0px auto 115px auto',
    height: '100%'
  }),
  stripe: {
    zIndex: -1,
    width: '100%',
    height: '85%',
    overflow: 'hidden',
    WebkitTransform: 'skwY(-12deg)',
    transform: 'skewY(-12deg)',
    WebkitTransformOrigin: 0,
    transformOrigin: 0,
    backgroundColor: theme.tertiary,
    position: 'absolute'
  },
  notice: {
    position: 'relative',
    gridArea: 'notice',
    padding: '10px 5px',
    backgroundColor: theme.accent,
    color: theme.white,
    border: '3px solid #5d66ce',
    textAlign: 'center',
    borderRadius: 8,
    zIndex: 0,
    margin: '15px',
    fontSize: 16
  }
});

export default withStyles(styles)(Play);
