import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
import { EditorState, GameState } from './types';

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

  const sessionId: string = useSelector(
    (state: AppState) => state.game.room.sessionId || null
  );

  const [gameState, setGameState] = useState<GameState>({
    currentInput: '',
    currentWord: gameboard?.words[0] || '',
    currentIndex: 0,
    words: gameboard?.words || [],
    wordsRemaining: gameboard?.words || [],
    wordsComplete: [],
    snippetId: snippet?.id
  });

  const [editorState, setEditorState] = useState<EditorState>({
    key: null,
    wrongIndex: null,
    entries: 0,
    errors: 0
  });

  useEffect(() => {
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
  }, [gameboard.words, snippet?.id, sessionId]);

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
        <div className={styles.editor}>
          <Editor
            gameboard={gameboard}
            gameState={gameState}
            setEditorState={setEditorState}
            isWrong={editorState.wrongIndex !== null}
            inputDidUpdate={inputDidUpdate}
            submitWord={submitWord}
          />
          <section
            style={{
              margin: '20px 0px',
              maxWidth: '540px !important'
            }}
          >
            <Adsense
              client="ca-pub-3148839588626786"
              layout="in-article"
              slot="6958577240"
              format="fluid"
            />
          </section>
          <div className={styles.tips}>
            <h3>Typing on Typer.io</h3>
            <p>
              Typing speed can make a world of difference when using computers.
              The more comfortable you are typing, the more you can focus on
              what you are working on. Slow typing and fixing typing errors
              moves your attention away from what you are trying to achieve
              (writing an email, filling in a form, etc.).
            </p>
            <p>
              Practice is key to improving your typing skills. The more you
              practice against others, the faster you will type. I believe that
              competition is the best way to speed up the learning process even
              further. It is in human nature to compete and through repetition
              and the desire to win and improve, one can improve their speed in
              typing very quickly.
            </p>
            <p>
              In order to keep track of your progress, you can easily create an
              account. Each race will be saved and you can view your progress
              over time. Registered members are also able to post messages on
              our forum.
            </p>
            <h3>Helpful Tips To Win</h3>
            <ul>
              <li>
                Make sure the typing box is focused before the game starts so
                you can begin typing right away.
              </li>
              <li>
                On Typer.io, you cannot ignore errors. The game lets you keep
                typing even after making an error, so try correct it as soon as
                possible!
              </li>
              <li>
                Many fast racers start with their fingers already on the first
                few keys to get the greatest advantage possible.
              </li>
            </ul>
          </div>
        </div>
        {!isSolo && (
          <section className={styles.left}>
            <Chat />
            <section
              style={{
                margin: '20px 0px',
                maxWidth: '540px !important'
              }}
            >
              <Adsense
                client="ca-pub-3148839588626786"
                layout="in-article"
                slot="6958577240"
                format="fluid"
              />
            </section>
          </section>
        )}
      </div>
      <div className={styles.notice}>
        Mobile functionality is limited, consider playing on your computer!
      </div>
    </div>
  );
};

Play.defaultProps = {
  isSolo: false,
  isCustom: false
};

export default Play;
