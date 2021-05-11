export interface GameState {
  currentInput: string;
  currentWord: string;
  currentIndex: number;
  words: string[];
  wordsRemaining: string[];
  wordsComplete: string[];
  snippetId?: number | null;
  sessionId?: string | null;
}

export interface EditorState {
  key: number | null;
  wrongIndex: number | null;
  entries: number;
  errors: number;
}
