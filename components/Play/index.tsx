import dynamic from 'next/dynamic';
import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { silentEmit } from '../../services/socket';
import { AppState } from '../../store';
import { GameboardState, SnippetState } from '../../store/game/types';
import Chat from './Chat';
import ClientList from './ClientList';
import Editor from './Editor';
import Gameboard from './Gameboard';
import styles from './index.module.css';
import Leaderboard from './leaderboard';
import PlayStatus from './Status/Status';
import { EditorState, GameState } from './types';

const Adsense = dynamic(() => import('../Shared/Adsense'), {
  ssr: false
});

interface Props {
  isSolo?: boolean;
  isCustom?: boolean;
}

const Play = (props: Props) => {
  const { isSolo, isCustom } = props;

  const gameboard: GameboardState = useSelector((state: AppState) => state.game.room.gameboard);
  const snippet: SnippetState = useSelector((state: AppState) => state.game.room?.snippet || null);
  const isStarted: boolean = useSelector((state: AppState) => state.game.room.isStarted);
  const textDifficulty: string = useSelector((state: AppState) => state.game.room.textDifficulty);

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

  // For implementating game with trailing spaces...
  // console.log(test.split(/(?:[^\s"]+)+ /));

  useEffect(() => {
    if (snippet?.id !== gameState.snippetId || !isStarted || isSolo) {
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
  }, [gameState.snippetId, gameboard.words, isSolo, isStarted, snippet?.id, textDifficulty]);

  const submitWord = (): void => {
    const { wordsRemaining, words, currentIndex } = gameState;
    const temp = [...wordsRemaining];
    const removed = temp.shift();

    // + 1 includes the space key
    const newEntries = words[currentIndex].length + 1;
    // const newIndex = currentIndex;

    const data = JSON.stringify({
      er: editorState.errors,
      en: newEntries
    });

    const payload = btoa(data);
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

  function calculateWrongIndex(target: string) {
    const { currentWord } = gameState;
    const { wrongIndex } = editorState;

    const input = target.split('');
    const word = currentWord.split('');

    for (let i = 0; i < currentWord.length; i += 1) {
      if (input[i]) {
        if (!(input[i] === word[i] || (wrongIndex !== null && wrongIndex < i))) {
          if (i < wrongIndex || wrongIndex === null) {
            return i;
          }
        }
      }
    }

    return null;
  }

  const inputDidUpdate = (event): void => {
    // console.log(`DidUpdate: ${event.target.value}`);
    setGameState({ ...gameState, currentInput: event.target.value });

    const wrongIndex = calculateWrongIndex(event.target.value);

    if (wrongIndex !== null) {
      setEditorState((prev) => ({ ...prev, wrongIndex }));
    }

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
        {!isSolo && <ClientList />}
        <PlayStatus gameboard={gameboard} isCustom={isCustom} isSolo={isSolo} />
        <section className={styles.right}>
          <Leaderboard />
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
          {/* <div className={styles.tips}>
            <h2>Typing on Typer.io</h2>
            <p>
              Want to be apart of the community? Join the{' '}
              <a href="https://discord.com/invite/E2Fj4h3JCa">discord</a>.
            </p>
            <p>
              Typing speed can make a world of difference when using computers. The more comfortable
              you are typing, the more you can focus on what you are working on. Slow typing and
              fixing errors moves your attention away from what you are trying to achieve.
            </p>
            <p>
              Practice is the key to improving your typing skills. The more you practice against
              others, the faster you will type. Competition is often the best way to speed up the
              learning process. Through repetition and the desire to win and improve, one can
              improve their typing speed very quickly.
            </p>
            <p>
              In order to keep track of your progress, you can easily create an account. Each race
              will be saved and you can view your progress over time. Registered members are also
              able to post messages on our forum.
            </p>
          </div> */}
        </section>
        <Gameboard
          wrongIndex={editorState.wrongIndex}
          gameState={gameState}
          setEditorState={setEditorState}
        />
        <div className={styles.editor}>
          <Editor
            isStarted={gameboard.isStarted}
            isOver={gameboard.isOver}
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
          {/* {!isSolo && (
            <section>
              <MatchSummary />
            </section>
          )} */}
        </div>
        <section className={styles.left}>
          {isSolo && <ClientList isSolo={isSolo} />}
          {!isSolo && <Chat />}
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
          {/* <div className={styles.tips}>
            <h2>Helpful Tips</h2>
            <ul>
              <li>
                Make sure the typing box is focused before the game starts so you can begin typing
                right away.
              </li>
              <li>
                You cannot ignore errors, so try to notice and correct them as soon as possible to
                get back on track!
              </li>
              <li>
                Some fast racers start with their fingers already on the first few keys to get the
                greatest advantage possible.
              </li>
              <li>
                Many fast racers read the first few words before the game starts to type them
                quicker.
              </li>
            </ul>
          </div> */}
        </section>
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

export default memo(Play);
