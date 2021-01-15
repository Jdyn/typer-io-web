import React, { useState } from 'react';
import styles from './index.module.css';

const Word = (props) => {
  const {
    word,
    index,
    currentIndex,
    input,
    wrongIndex,
    setEditorState
  } = props;

  const validateLetter = (index) => {
    if (input[index]) {
      if (input[index] === word.split('')[index]) {
        if (wrongIndex !== null) {
          if (wrongIndex < index) {
            return '#f44336';
          }
        }
        return '#00c805';
      }

      if (index < wrongIndex || wrongIndex === null) {
        setEditorState((prev) => ({ ...prev, wrongIndex: index }));
      }
      return '#f44336';
    }

    return '#4c4c4c';
  };

  return currentIndex === index ? (
    <div className={`${styles.word} ${styles.current}`}>
      {word.split('').map((letter, index) => (
        <span
          key={index}
          className={styles.letter}
          style={{
            color:
              currentIndex === props.index ? validateLetter(index) : '#4c4c4c'
          }}
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
