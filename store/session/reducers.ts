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
  userRefreshed: (state, action) => {
    state.isLoggedIn = action.payload.isLoggedIn;
    state.user = action.payload.user;
  }
};

const session = createSlice({
  name: 'session',
  initialState,
  reducers
});

export const { userRefreshed } = session.actions;

export default session.reducer;
