/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false
};

const reducers = {
  LoggedIn: (state, action) => {
    state.isLoggedIn = action.payload.isLoggedIn;
    state.user = action.payload.user;
  }
};

const session = createSlice({
  name: 'session',
  initialState,
  reducers
});

// export const {} = session.actions;

export default session.reducer;
