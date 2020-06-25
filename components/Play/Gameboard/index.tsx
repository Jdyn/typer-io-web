import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Banner from '../../Shared/Banner';
import Word from './Word';
import Piece from './Piece';
import { AppState } from '../../../store';
import styles from './index.module.css';
import { EditorState } from '../types';

interface Props {
  words: string[];
  wrongIndex: number;
  currentInput: string;
  currentWord: string;
  currentIndex: number;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
}

const Gameboard = (props: Props): JSX.Element => {
  const { words, wrongIndex, currentInput, currentWord, currentIndex, setEditorState } = props;
  const clientId = useSelector((state: AppState) => state.game.meta.id);
  const clients = useSelector((state: AppState) => state.game.room.clients);

  useEffect(() => {
    if (currentWord) {
      if (currentInput.length > currentWord.length) {
        setEditorState((prev) => ({
          ...prev,
          wrongIndex: -1
        }));
      }
    }

    if (wrongIndex !== null) {
      if (currentWord) {
        if (currentInput === currentWord.substring(0, currentInput.length)) {
          setEditorState((prev) => ({
            ...prev,
            wrongIndex: null,
            errors: prev.errors + 1
          }));
        }
      }
    }
  }, [wrongIndex, currentInput, currentWord, setEditorState]);

  useEffect(() => {
    setEditorState((prev) => ({ ...prev, wrongIndex: null }));
  }, [currentWord, setEditorState]);

  return (
    <div className={styles.root}>
      <Banner>
        <h1>Gameboard</h1>
      </Banner>
      <div className={styles.container}>
        {words.map((word, wordIndex) => (
          <div key={wordIndex} className={styles.wrapper}>
            <Word
              input={currentInput ? currentInput.split('') : []}
              currentIndex={currentIndex}
              word={word}
              index={wordIndex}
              wrongIndex={wrongIndex}
              setEditorState={setEditorState}
            />
            {clients
              .filter((object) => object.id !== clientId)
              .map((client, pieceIndex) => {
                const { position, color, oldPosition } = client.gamePiece;
                let test = position;

                if (position - oldPosition >= 2) {
                  test = oldPosition + 1;
                }

                if (wordIndex === 0 && position === null)
                  return <Piece key={pieceIndex} color={color} position={position} />;

                return position === wordIndex ? (
                  <Piece key={pieceIndex} color={color} position={test} />
                ) : null;
              })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Gameboard);
