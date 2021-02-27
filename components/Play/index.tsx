import { useEffect, useState } from 'react';
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
import { GameboardState, SnippetState } from '../../store/game/types';
import Adsense from '../Shared/Adsense';

interface Props {
  isSolo?: boolean;
  isCustom?: boolean;
}

const Play = (props: Props): JSX.Element => {
  const { isSolo, isCustom } = props;

  const gameboard: GameboardState = useSelector(
    (state: AppState) => state.game.room.gameboard
  );

  const snippet: SnippetState = useSelector(
    (state: AppState) => state.game.room.snippet
  );

  const isStarted: boolean = useSelector(
    (state: AppState) => state.game.room.isStarted
  );

  const [gameState, setGameState] = useState({
    currentInput: '',
    currentWord: gameboard?.words[0] || '',
    currentIndex: 0,
    words: gameboard?.words || [],
    wordsRemaining: gameboard?.words || [],
    wordsComplete: [],
    snippetId: snippet?.id
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
    if (!isStarted || isSolo) {
      setGameState((prev) => ({
        ...prev,
        currentWord: gameboard.words[0] || '',
        currentIndex: 0,
        words: gameboard.words,
        wordsRemaining: gameboard.words,
        wordsComplete: [],
        snippetId: snippet?.id
      }));
    }
  }, [isStarted, setGameState, gameboard.words, isSolo, snippet?.id]);

  useEffect(() => {
    if (snippet?.id !== gameState.snippetId) {
      setGameState({
        currentInput: '',
        currentWord: gameboard.words[0] || '',
        currentIndex: 0,
        words: gameboard.words,
        wordsRemaining: gameboard.words,
        wordsComplete: [],
        snippetId: snippet?.id
      });

      setEditorState({
        key: null,
        wrongIndex: null,
        entries: 0,
        errors: 0
      });
    }
  }, [gameState.snippetId, gameboard.words, snippet?.id]);

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
    <div className={styles.root}>
      <div className={`${styles.container} ${isSolo && styles.soloContainer}`}>
        <ClientList isSolo={isSolo} />
        <PlayStatus gameboard={gameboard} isCustom={isCustom} isSolo={isSolo} />
        <Leaderboard />
        <Gameboard
          wrongIndex={editorState.wrongIndex}
          gameState={gameState}
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
      </div>
      <section
        style={{
          margin: '20px auto',
          padding: '0px 10px',
          height: '225px',
          maxWidth: '900px',
          gridArea: 'content'
        }}
      >
        <Adsense
          client="ca-pub-3148839588626786"
          layout="in-article"
          slot="6958577240"
          format="fluid"
        />
      </section>
    </div>
  );
};

Play.defaultProps = {
  isSolo: false,
  isCustom: false
};

export default Play;
