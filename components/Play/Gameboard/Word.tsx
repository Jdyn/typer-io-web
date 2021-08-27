import { memo, useCallback } from 'react';
import styles from './index.module.css';

interface Props {
  word: string;
  currentIndex?: number;
  input?: string[];
  wrongIndex?: number;
}

const Word = (props: Props): JSX.Element => {
  const { word, currentIndex, input, wrongIndex } = props;

  const validateLetter = (letterIndex: number): string => {
    if (input[letterIndex]) {
      if (input[letterIndex] === word.split('')[letterIndex]) {
        if (wrongIndex !== null) {
          if (wrongIndex < letterIndex) {
            return styles.wrong;
          }
        }
        return styles.correct;
      }
      return styles.wrong;
    }
    return styles.base;
  };

  const calculateWidth = useCallback(() => {
    let newLeft = 0;
    const currentLength = input.length;

    for (let i = 0; i < word.length; i += 1) {
      if (i < currentLength) {
        const element = document.getElementById(`letter-${i}`);
        newLeft += element.offsetWidth;
      }
    }

    return newLeft - 2.5;
  }, [input.length, word.length]);

  return currentIndex !== null ? (
    <div className={`${styles.word} ${styles.current}`}>
      <div
        id="caret"
        className={styles.caret}
        style={{
          left: calculateWidth()
        }}
      />
      {word.split('').map((letter, letterIndex) => (
        <span
          key={letterIndex}
          id={`letter-${letterIndex}`}
          className={`${styles.letter} ${validateLetter(letterIndex)}`}
          style={{
            textDecoration: 'underline'
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
          className={`${styles.letter}`}
          style={{
            textDecoration: 'none'
          }}
        >
          {letter}
        </span>
      ))}
    </span>
  );
};

Word.defaultProps = {
  currentIndex: null,
  input: [],
  wrongIndex: null
};

export default memo(Word);
