import React from 'react';
import styles from './index.module.css';
import { EditorState } from '../types';

interface Props {
  word: string;
  index: number;
  currentIndex: number;
  input: string[];
  wrongIndex: number;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
}

const Word = (props: Props): JSX.Element => {
  const {
    word,
    index,
    currentIndex,
    input,
    wrongIndex,
    setEditorState
  } = props;

  const validateLetter = (index: number): string => {
    if (input[index]) {
      if (input[index] === word.split('')[index]) {
        if (wrongIndex !== null) {
          if (wrongIndex < index) {
            return styles.wrong;
          }
        }
        return styles.correct;
      }

      if (index < wrongIndex || wrongIndex === null) {
        setEditorState((prev) => ({ ...prev, wrongIndex: index }));
      }
      return styles.wrong;
    }

    return styles.base;
  };

  return currentIndex === index ? (
    <div className={`${styles.word} ${styles.current}`}>
      {word.split('').map((letter, index) => (
        <span
          key={index}
          className={`${styles.letter} ${
            currentIndex === props.index ? validateLetter(index) : styles.base
          }`}
        >
          {letter}
        </span>
      ))}
    </div>
  ) : (
    <span className={styles.word}>{word}</span>
  );
};

export default Word;
