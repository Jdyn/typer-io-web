import { memo } from 'react';
import styles from './index.module.css';

interface Props {
  word: string;
  currentIndex?: number;
  input?: string[];
  wrongIndex?: number;
  setEditorState?: any;
}

const Word = (props: Props): JSX.Element => {
  const { word, currentIndex, input, wrongIndex, setEditorState } = props;

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

      if (letterIndex < wrongIndex || wrongIndex === null) {
        setEditorState((prev) => ({ ...prev, wrongIndex: letterIndex }));
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
        newLeft += element.offsetWidth;
      }
    }

    const caret = document.getElementById('caret');

    // if (currentLetter === word.length && wrongIndex === null) {
    //   return newLeft + 8 + caret?.offsetWidth / 2 || 0;
    // }

    return newLeft + caret?.offsetWidth / 2 || 0;
  };

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
  input: null,
  wrongIndex: null,
  setEditorState: null
};

export default memo(Word);
