import React from 'react';
import styles from './index.module.css';

interface Props {
  word: string;
  index: number;
  currentIndex: number;
  input: string[];
  wrongIndex: number;
  setEditorState: any;
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

  const calculateWidth = (): number => {
    let newLeft = 1;

    const currentLetter = input.length;

    for (let i = 0; i < word.length; i += 1) {
      if (i < currentLetter) {
        const element = document.getElementById(`letter-${i}`);
        newLeft += element.getBoundingClientRect().width;
      }
    }

    const caret = document.getElementById('caret');

    // if (currentLetter === word.length && wrongIndex === null) {
    //   return newLeft + 8 + caret?.offsetWidth / 2 || 0;
    // }

    return newLeft + caret?.offsetWidth / 2 || 0;
  };

  return currentIndex === index ? (
    <div className={`${styles.word} ${styles.current}`}>
      {currentIndex === index && (
        <div
          id="caret"
          className={styles.caret}
          style={{
            left: calculateWidth()
          }}
        />
      )}
      {word.split('').map((letter, letterIndex) => (
        <span
          key={letterIndex}
          id={`letter-${letterIndex}`}
          className={`${styles.letter} ${
            currentIndex === props.index
              ? validateLetter(letterIndex)
              : styles.base
          }`}
          style={{
            textDecoration: currentIndex === index ? 'underline' : 'none'
          }}
        >
          {letter}
        </span>
      ))}
    </div>
  ) : (
    <span className={styles.word}>
      {word.split('').map((letter, letterIndex) => (
        <span
          key={letterIndex}
          className={`${styles.letter} ${
            currentIndex === props.index
              ? validateLetter(letterIndex)
              : styles.base
          }`}
          style={{
            textDecoration: currentIndex === index ? 'underline' : 'none'
          }}
        >
          {letter}
        </span>
      ))}
    </span>
  );
};

export default React.memo(Word);
