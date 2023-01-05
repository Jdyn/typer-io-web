/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  KeyboardEvent,
  useMemo,
  useRef,
  useCallback
} from 'react';
import { silentEmit } from '../../../services/socket';
import { useAppSelector } from '../../../store';
import { EditorState, GameState } from '../types';
import styles from './index.module.css';

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

  const isSolo = useAppSelector((state) => state.game.room.isSolo);
  const isConnected = useAppSelector((state) => state.game.socket.connected || false);

  const inputElement = useRef<HTMLInputElement>(null);

  const focusInput = useCallback((): void => {
    inputElement.current.focus();
  }, []);

  useEffect(() => {
    focusInput();
  }, [focusInput, isConnected, isStarted]);

  const keydown = (event: KeyboardEvent): void => {
    const { currentInput, currentWord, wordsRemaining } = gameState;

    if (event.key === 'Control') {
      return;
    }

    if (event.key === ' ' && !isStarted && isSolo) {
      silentEmit('SOLO_START_GAME');
    }

    if (!isStarted || isOver || wordsRemaining.length === 0) {
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
        inputElement.current.innerText = '';
        if (wordsRemaining.length !== 0) {
          submitWord();
        }
      }
    }
  };

  const inputPlaceholder = useMemo((): string => {
    if (!isStarted && !isOver) {
      if (isSolo) {
        return "Press 'Space' here to begin...";
      }
      return 'Type here when the game begins...';
    }
    return '';
  }, [isStarted, isOver, isSolo]);

  return (
    <div role="button" className={styles.root} onClick={focusInput}>
      <div
        role="button"
        className={styles.container}
        style={{ background: isWrong ? '#f4433666' : 'transparent' }}
        onClick={focusInput}
      >
        <input
          id="input"
          ref={inputElement}
          className={styles.input}
          onClick={focusInput}
          tabIndex={0}
          placeholder={inputPlaceholder}
          autoComplete="off"
          autoCorrect="off"
          maxLength={gameState.currentWord ? gameState.currentWord.length : 524288}
          autoCapitalize="none"
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
