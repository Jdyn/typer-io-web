/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SessionState, SessionUser } from './types';

const initialState: SessionState = {
  isLoggedIn: false,
  nickname: null,
  user: null
};

const userRefreshedAction: CaseReducer<
  SessionState,
  PayloadAction<{ isLoggedIn: boolean; user: Partial<SessionUser> }>
> = (state, action): void => {
  state.isLoggedIn = action.payload.isLoggedIn;
  state.user = { ...state.user, ...action.payload.user };
};

const userLoggedOutAction: CaseReducer<SessionState, PayloadAction<void>> = (state): void => {
  state.user = null;
  state.isLoggedIn = false;
};

const userUpdatedAction: CaseReducer<SessionState, PayloadAction<Partial<SessionUser>>> = (
  state,
  action
): void => {
  state.user = { ...state.user, ...action.payload };
};

const nicknameChangedAction: CaseReducer<SessionState, PayloadAction<string>> = (
  state,
  action
): void => {
  state.nickname = action.payload;
};

const session = createSlice({
  name: 'session',
  initialState,
  reducers: {
    nicknameChanged: nicknameChangedAction,
    userRefreshed: userRefreshedAction,
    userLoggedOut: userLoggedOutAction,
    userUpdated: userUpdatedAction
  }
});

export const { nicknameChanged, userLoggedOut, userRefreshed, userUpdated } = session.actions;

export default session.reducer;
