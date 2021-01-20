export interface GameboardState {
  gameTime: string;
  isStarted: boolean;
  isOver: boolean;
  clientsComplete: number;
  words: string[];
  text: string;
}

export interface SnippetState {
  wordCount: number;
  author: string | null;
  createdAt: string;
  difficulty: string;
  id: number;
  quote: string;
  title: string;
}
