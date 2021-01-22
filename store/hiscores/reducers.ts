/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  all: [],
  day: [],
  week: [],
  month: [],
  user: []
};

const reducers = {
  hiscoresFetched: (state, action) => {
    state[action.payload.key] = action.payload.matches;
  }
};

const hiscores = createSlice({
  name: 'hiscores',
  initialState,
  reducers
});

export const { hiscoresFetched } = hiscores.actions;

export default hiscores.reducer;
