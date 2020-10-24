import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ReactGA from 'react-ga';
import ClientList from './ClientList';
import Gameboard from './Gameboard';
import Chat from './Chat';
import { silentEmit } from '../../services/socket';
import PlayStatus from './Status/Status';
import Leaderboard from './leaderboard';
import Editor from './Editor';
import { AppState } from '../../store';
import styles from './index.module.css';

interface Props {
  isSolo?: boolean;
}

const Play = (props: Props): JSX.Element => {
  const { isSolo } = props;

  const gameboard = useSelector((state: AppState) => state.game.room.gameboard);

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

  const submitWord = (): void => {
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

  const inputDidUpdate = (event): void => {
    setGameState({ ...gameState, currentInput: event.target.value });

    if (gameState.wordsRemaining.length === 1) {
      if (event.target.value.trim() === gameState.currentWord) {
        const input = document.getElementById('input') as HTMLInputElement;
        input.value = '';
        submitWord();
      }
    }
  };

  return (
    <>
      <div className={`${styles.root} ${isSolo && styles.soloRoot}`}>
        <ClientList isSolo={isSolo} />
        <PlayStatus gameboard={gameboard} />
        <Leaderboard />
        <Gameboard
          wrongIndex={editorState.wrongIndex}
          currentInput={gameState.currentInput}
          currentWord={gameState.currentWord}
          currentIndex={gameState.currentIndex}
          words={gameboard.words}
          setEditorState={setEditorState}
        />
        <Editor
          gameboard={gameboard}
          gameState={gameState}
          setEditorState={setEditorState}
          isWrong={editorState.wrongIndex !== null}
          inputDidUpdate={inputDidUpdate}
          submitWord={submitWord}
        />
        {!isSolo && <Chat />}
        {!gameboard.isStarted && !gameboard.isOver ? (
          <span className={styles.notice}>
            Tip: Type the words in the box above when the game begins.
          </span>
        ) : null}
      </div>
    </>
  );
};

export default Play;