/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { SessionState } from './types';

const initialState: SessionState = {
  isLoggedIn: false,
  nickname: null,
  user: null
};

const reducers = {
  userLoggedIn: (state, action) => {
    state.isLoggedIn = true;
    state.user = action.payload.user;
  },
  userRefreshed: (state, action) => {
    state.isLoggedIn = action.payload.isLoggedIn;
    state.user = action.payload.user;
  },
  nicknameChanged: (state, action) => {
    state.nickname = action.payload;
  },
  userLoggedOut: (state, _action) => {
    state.user = null;
    state.isLoggedIn = false;
  },
  userUpdated: (state, action) => {
    state.user = { ...state.user, ...action.payload.user };
  }
};

const session = createSlice({
  name: 'session',
  initialState,
  reducers
});

export const { nicknameChanged, userLoggedIn, userLoggedOut, userRefreshed, userUpdated } =
  session.actions;

export default session.reducer;
