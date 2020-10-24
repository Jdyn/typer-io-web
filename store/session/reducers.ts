/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  nickname: null,
  user: null
};

const reducers = {
  userLoggedIn: (state, action) => {
    state.isLoggedIn = true;
    state.user = action.payload.user;
  },
  userSignedUp: (state, action) => {
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
  userLoggedOut: (state, action) => {
    state.user = null;
    state.isLoggedIn = false;
  }
};

const session = createSlice({
  name: 'session',
  initialState,
  reducers
});

export const {
  nicknameChanged,
  userLoggedIn,
  userSignedUp,
  userLoggedOut,
  userRefreshed
} = session.actions;

export default session.reducer;