export interface GameState {
  currentInput: string;
  currentWord: string;
  currentIndex: number;
  words: string[];
  wordsRemaining: string[];
  wordsComplete: string[];
}

export interface EditorState {
  key: number | null;
  wrongIndex: number | null;
  entries: number;
  errors: number;
}
