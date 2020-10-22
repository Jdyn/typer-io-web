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

  const [wordArray] = useState(word.split(''));

  const validateLetter = (index) => {
    if (input[index]) {
      if (input[index] === wordArray[index]) {
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

    return 'black';
  };

  return currentIndex === index ? (
    <div className={`${styles.word} ${styles.current}`}>
      {wordArray.map((letter, index) => (
        <span
          key={index}
          className={styles.letter}
          style={{
            color:
              currentIndex === props.index ? validateLetter(index) : 'black'
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
