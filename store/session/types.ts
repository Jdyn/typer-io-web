import { MiniPost, Match } from '../../services/types';

export interface SessionRequests {
  AUTHENTICATE: 'AUTHENTICATE';
  UPDATE_USER: 'UPDATE_USER';
  FETCH_ACCOUNT_PASSWORD_UPDATE: 'FETCH_ACCOUNT_PASSWORD_UPDATE';
  FETCH_ACCOUNT_PASSWORD_RESET: 'FETCH_ACCOUNT_PASSWORD_RESET';
}

export const requests: SessionRequests = {
  AUTHENTICATE: 'AUTHENTICATE',
  UPDATE_USER: 'UPDATE_USER',
  FETCH_ACCOUNT_PASSWORD_UPDATE: 'FETCH_ACCOUNT_PASSWORD_UPDATE',
  FETCH_ACCOUNT_PASSWORD_RESET: 'FETCH_ACCOUNT_PASSWORD_RESET'
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
  nickname?: string | null;
  user: SessionUser | null;
}

export interface User {
  id: number;
  token: string;
  username: string;
  isAdmin: string;
  email: string;
  country: string;
  insertedAt: string;
  bio: string;
  avatarUrl?: string | null;
}

export type SessionUser = User & {
  token: string;
  country?: string;
  age?: string;
  goal?: number;
  gender?: string;
  emailVerified: boolean;
  avatarUrl?: string | null;
};

export interface SignupPayload {
  email: string;
  username: string;
  password: string;
}

export interface SigninPayload {
  username: string;
  password: string;
}

export interface ProfileUser {
  averageAccuracy: number;
  averageWpm: number;
  averageErrors: number;
  recentAverageAccuracy: number;
  recentAverageWpm: number;
  recentAverageErrors: number;
  topWpm: number;
  bio: string;
  id: number;
  age?: number;
  gender?: string;
  insertedAt: string;
  isAdmin: boolean;
  matchCount: number;
  totalWins: number;
  matchMaxPage: number;
  matchPage: number;
  country?: string;
  matches: Match[];
  posts: MiniPost[];
  username: string;
  avatarUrl?: string | null;
}
