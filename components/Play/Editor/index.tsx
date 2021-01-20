import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { GameboardState } from '../../../store/game/types';
import { EditorState, GameState } from '../types';
import styles from './index.module.css';

const focusInput = (): void => {
  const editor = document.getElementById('input');
  if (editor) {
    editor.focus();
  }
};

interface Props {
  gameboard: GameboardState;
  gameState: GameState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
  submitWord: () => void;
  isWrong: boolean;
  inputDidUpdate: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Editor = (props: Props): JSX.Element => {
  const {
    gameboard,
    inputDidUpdate,
    submitWord,
    setEditorState,
    gameState,
    isWrong
  } = props;

  useEffect(() => {
    focusInput();
  }, []);

  const keydown = (event: React.KeyboardEvent): void => {
    const { currentInput, currentWord, wordsRemaining } = gameState;

    if (!gameboard.isStarted) {
      event.preventDefault();
    }

    if (gameboard.isOver) {
      event.preventDefault();
      ReactGA.event({ category: 'game', action: 'game-ended-no-time' });
      return;
    }

    if (wordsRemaining.length === 0) {
      event.preventDefault();
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
    <div
      role="button"
      tabIndex={0}
      className={styles.root}
      onClick={focusInput}
      onKeyUp={focusInput}
    >
      <div
        role="button"
        tabIndex={0}
        className={styles.container}
        style={{ background: isWrong ? '#f4433666' : 'transparent' }}
        onClick={focusInput}
        onKeyUp={focusInput}
      >
        <input
          id="input"
          className={styles.input}
          onClick={(): void => focusInput()}
          tabIndex={0}
          autoComplete="off"
          autoCorrect="off"
          maxLength={
            gameState.currentWord ? gameState.currentWord.length : 524288
          }
          autoCapitalize="off"
          spellCheck="false"
          value={gameState.currentInput}
          onChange={inputDidUpdate}
          onKeyDown={keydown}
        />
      </div>
    </div>
  );
};

export default Editor;
