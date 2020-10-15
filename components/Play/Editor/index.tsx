import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga';
import styles from './index.module.css';

const focusInput = (): void => {
  const editor = document.getElementById('input');
  if (editor) {
    editor.focus();
  }
};

const Editor = (props) => {
  const {
    gameboard,
    inputDidUpdate,
    submitWord,
    setEditorState,
    gameState,
    isWrong
  } = props;
  const [isComplete, setComplete] = useState(false);

  useEffect(() => {
    focusInput();
  }, []);

  const keydown = (event) => {
    const { currentInput, currentWord, wordsRemaining } = gameState;

    if (!gameboard.isStarted) {
      event.preventDefault();
    }

    if (gameboard.isOver) {
      event.preventDefault();
      setComplete(true);
      ReactGA.event({ category: 'game', action: 'game-ended-no-time' });
      return;
    }

    if (wordsRemaining.length === 0) {
      event.preventDefault();
      setComplete(true);
      ReactGA.event({ category: 'game', action: 'game-ended-finished' });
      return;
    }

    if (event.key !== 'Backspace') {
      if (currentInput !== currentWord.substring(0, currentInput.length)) {
        setEditorState((prev) => ({ ...prev, errors: prev.errors + 1 }));
      }
    }

    if (event.key === ' ') {
      if (currentInput !== currentWord) {
        event.preventDefault();
      } else if (currentInput.trim() === currentWord) {
        event.preventDefault();
        document.getElementById('input').innerText = '';
        if (wordsRemaining.length !== 0) {
          submitWord();
        }
      }
    } else if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <div className={styles.root} onClick={() => focusInput()}>
      <div
        className={styles.container}
        style={{ background: isWrong ? '#f4433666' : 'transparent' }}
      >
        <input
          id="input"
          className={styles.input}
          tabIndex={0}
          autoComplete="off"
          autoCorrect="off"
          readOnly={isComplete}
          maxLength={
            gameState.currentWord ? gameState.currentWord.length + 5 : 524288
          }
          autoCapitalize="off"
          spellCheck="false"
          value={gameState.currentInput}
          onChange={(e) => inputDidUpdate(e)}
          onKeyDown={(e) => keydown(e)}
        />
      </div>
    </div>
  );
};

export default Editor;
