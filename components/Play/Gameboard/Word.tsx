import { memo, useEffect } from 'react';
import styles from './index.module.css';

interface Props {
  word: string;
  wordIndex: number;
  currentIndex: number;
  input: string[];
  wrongIndex: number;
  currentWord: string;
  setEditorState: any;
}

const Word = (props: Props): JSX.Element => {
  const {
    word,
    wordIndex,
    currentIndex,
    input,
    wrongIndex,
    currentWord,
    setEditorState
  } = props;

  useEffect(() => {
    if (input.length > currentWord.length) {
      setEditorState((prev) => ({ ...prev, wrongIndex: 1000 }));
    }
  }, [input, currentWord, setEditorState]);

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
        newLeft += element.getBoundingClientRect().width;
      }
    }

    const caret = document.getElementById('caret');

    // if (currentLetter === word.length && wrongIndex === null) {
    //   return newLeft + 8 + caret?.offsetWidth / 2 || 0;
    // }

    return newLeft + caret?.offsetWidth / 2 || 0;
  };

  const validateNextWord = (letterIndex) => {
    if (input.length > currentWord.length) {
      const diff = input.length - currentWord.length;
      if (letterIndex <= diff - 1) {
        return styles.wrong;
      }
    }

    return '';
  };

  return currentIndex === wordIndex ? (
    <div className={`${styles.word} ${styles.current}`}>
      {currentIndex === wordIndex && (
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
            currentIndex === wordIndex
              ? validateLetter(letterIndex)
              : styles.base
          }`}
          style={{
            textDecoration: currentIndex === wordIndex ? 'underline' : 'none'
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
            currentIndex + 1 === wordIndex ? validateNextWord(letterIndex) : ''
          }`}
          style={{
            textDecoration: currentIndex === wordIndex ? 'underline' : 'none'
          }}
        >
          {letter}
        </span>
      ))}
    </span>
  );
};

export default memo(Word);
