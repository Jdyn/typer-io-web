import { useEffect, useMemo, memo, Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { AnimateSharedLayout } from 'framer-motion';
import Banner from '../../Shared/Banner';
import Word from './Word';
import Piece from './Piece';
import { AppState } from '../../../store';
import styles from './index.module.css';
import { EditorState, GameState } from '../types';
import formatTime from '../../../util/formatTime';

interface Props {
  gameState: GameState;
  wrongIndex: number;
  setEditorState: Dispatch<SetStateAction<EditorState>>;
}

const Gameboard = (props: Props): JSX.Element => {
  const { wrongIndex, gameState, setEditorState } = props;
  const { currentWord, currentInput, currentIndex, words } = gameState;

  const clientId = useSelector((state: AppState) => state.game.meta.id);
  const clients = useSelector((state: AppState) => state.game.room.clients);
  const snippet = useSelector((state: AppState) => state.game.room.snippet);

  const client = useMemo(
    () => clients?.filter((client) => client.id === clientId)[0],
    [clientId, clients]
  );

  useEffect(() => {
    if (wrongIndex !== null) {
      if (currentWord) {
        if (currentInput === currentWord.substring(0, currentInput?.length)) {
          setEditorState((prev) => ({
            ...prev,
            wrongIndex: null,
            errors: prev.errors + 1
          }));
        }
      }
    }
  }, [wrongIndex, setEditorState, currentWord, currentInput]);

  useEffect(() => {
    setEditorState((prev) => ({ ...prev, wrongIndex: null }));
  }, [currentWord, setEditorState]);

  const wordElements = useMemo(
    () =>
      words.map((word, wordIndex) => (
        <div key={wordIndex} className={styles.wrapper}>
          <Word
            input={currentInput ? currentInput.split('') : []}
            currentIndex={currentIndex}
            word={word}
            index={wordIndex}
            setEditorState={setEditorState}
            wrongIndex={wrongIndex}
          />
          <AnimateSharedLayout>
            {clients
              .filter((object) => object.id !== clientId)
              .map((client) => {
                const { position, color } = client.gamePiece;

                if (wordIndex === 0 && position === null) {
                  return (
                    <Piece
                      key={client.id}
                      id={client.id}
                      emoji={client.emoji}
                      color={color}
                      position={position}
                    />
                  );
                }

                return (
                  position === wordIndex && (
                    <Piece
                      key={client.id}
                      id={client.id}
                      emoji={client.emoji}
                      color={color}
                      position={position}
                    />
                  )
                );
              })}
          </AnimateSharedLayout>
        </div>
      )),
    [
      clientId,
      clients,
      currentIndex,
      currentInput,
      setEditorState,
      words,
      wrongIndex
    ]
  );

  return (
    <div className={styles.root}>
      <Banner>
        <h1>
          Gameboard
          {client?.gamePiece && (
            <span className={styles.header}>
              you are{' '}
              <div
                style={{
                  background: client?.gamePiece?.color || 'transparent'
                }}
              />
            </span>
          )}
        </h1>
      </Banner>
      <div className={styles.container}>{wordElements}</div>
      <div className={styles.content}>
        {snippet.title && (
          <>
            <h1>
              {snippet.title}
              <span className={`${styles[snippet.difficulty]}`}>
                {snippet.difficulty}
              </span>
            </h1>
            <span>
              {snippet.author && (
                <>
                  <span>Said by </span>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.google.com/search?q=${snippet.author}`}
                  >
                    {snippet.author}
                  </a>
                </>
              )}
              {snippet.createdAt && (
                <span> • Added {formatTime(snippet.createdAt)}</span>
              )}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default memo(Gameboard);
