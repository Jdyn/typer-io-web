/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false
};

const reducers = {};

const session = createSlice({
  name: 'session',
  initialState,
  reducers
});

// export const {} = session.actions;

export default session.reducer;
