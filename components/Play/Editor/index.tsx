import { ChangeEvent, Dispatch, SetStateAction, useEffect, KeyboardEvent, memo } from 'react';
import { useSelector } from 'react-redux';
import { silentEmit } from '../../../services/socket';
import { AppState } from '../../../store';
import { EditorState, GameState } from '../types';
import styles from './index.module.css';

const focusInput = (): void => {
  const editor = document.getElementById('input');
  if (editor) {
    editor.focus();
  }
};

interface Props {
  isStarted: boolean;
  isOver: boolean;
  gameState: GameState;
  setEditorState: Dispatch<SetStateAction<EditorState>>;
  submitWord: () => void;
  isWrong: boolean;
  inputDidUpdate: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Editor = (props: Props): JSX.Element => {
  const { isStarted, isOver, inputDidUpdate, submitWord, setEditorState, gameState, isWrong } =
    props;

  useEffect(() => {
    focusInput();
  }, [isStarted]);

  const isSolo = useSelector((state: AppState) => state.game.room.isSolo);

  const keydown = (event: KeyboardEvent): void => {
    const { currentInput, currentWord, wordsRemaining } = gameState;
    if (event.key === ' ' && !isStarted && isSolo) {
      silentEmit('SOLO_START_GAME');
    }

    if (!isStarted) {
      event.preventDefault();
    }

    if (isOver) {
      event.preventDefault();
      return;
    }

    if (wordsRemaining.length === 0) {
      event.preventDefault();
      return;
    }

    if (event.key !== 'Backspace') {
      if (currentInput !== currentWord.substring(0, currentInput.length)) {
        setEditorState((prev) => ({ ...prev, errors: prev.errors + 1 }));
      }
    }

    if (event.key === ' ') {
      if (currentInput.trim() === currentWord) {
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

  const inputPlaceholder = (): string => {
    if (!isStarted && !isOver) {
      if (isSolo) {
        return "Press 'Space' here to begin...";
      }
      return 'Type here when the game begins...';
    }
    return '';
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
          placeholder={inputPlaceholder()}
          autoComplete="off"
          autoCorrect="off"
          maxLength={gameState.currentWord ? gameState.currentWord.length : 524288}
          autoCapitalize="off"
          spellCheck="false"
          value={gameState.currentInput}
          onChange={inputDidUpdate}
          onKeyDown={(e) => keydown(e)}
        />
      </div>
    </div>
  );
};

export default Editor;
