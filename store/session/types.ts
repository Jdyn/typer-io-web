import { MiniPost } from '../forum/types';
import { Match } from '../hiscores/types';

export interface SessionRequests {
  AUTHENTICATE: 'AUTHENTICATE';
  UPDATE_USER: 'UPDATE_USER';
}

export const requests: SessionRequests = {
  AUTHENTICATE: 'AUTHENTICATE',
  UPDATE_USER: 'UPDATE_USER'
};

interface SessionActions {
  LOG_IN: 'LOG_IN';
  SIGN_UP: 'SIGN_UP';
  LOG_OUT: 'LOG_OUT';
  REFRESH: 'session/REFRESH';
}

export const actions: SessionActions = {
  LOG_IN: 'LOG_IN',
  SIGN_UP: 'SIGN_UP',
  LOG_OUT: 'LOG_OUT',
  REFRESH: 'session/REFRESH'
};

export interface SessionState {
  isLoggedIn: boolean;
  nickname: string | null;
  user: User | null;
}

export interface User {
  id: number;
  token: string;
  username: string;
  isAdmin: string;
  email: string;
  bio: string;
}

export interface ProfileUser {
  averageAccuracy: number;
  averageWpm: number;
  topWpm: number;
  bio: string;
  id: number;
  insertedAt: string;
  isAdmin: boolean;
  matchCount: number;
  matchMaxPage: number;
  matchPage: number;
  matches: Match[];
  posts: MiniPost[];
  username: string;
}
