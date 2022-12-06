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

const userRefreshedAction: CaseReducer<SessionState, PayloadAction<SessionState>> = (
  state,
  action
): void => {
  state.isLoggedIn = action.payload.isLoggedIn;
  state.user = action.payload.user;
};

const userLoggedOutAction: CaseReducer<SessionState, PayloadAction<void>> = (state): void => {
  state.user = null;
  state.isLoggedIn = false;
};

const userUpdatedAction: CaseReducer<SessionState, PayloadAction<SessionUser>> = (
  state,
  action
): void => {
  state.user = { ...state.user, ...action.payload };
};

const reducers = {
  nicknameChanged: (state, action) => {
    state.nickname = action.payload;
  }
};

const session = createSlice({
  name: 'session',
  initialState,
  reducers: {
    ...reducers,
    userRefreshed: userRefreshedAction,
    userLoggedOut: userLoggedOutAction,
    userUpdated: userUpdatedAction
  }
});

export const { nicknameChanged, userLoggedOut, userRefreshed, userUpdated } = session.actions;

export default session.reducer;
