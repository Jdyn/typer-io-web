/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  all: [],
  day: [],
  week: [],
  month: [],
  user: [],
  topMatches: {}
};

const reducers = {
  hiscoresFetched: (state, action) => {
    state[action.payload.key] = action.payload.matches;
  },
  userHiscoresFetched: (state, action) => {
    state[action.payload.key] = action.payload[action.payload.key];
  }
};

const hiscores = createSlice({
  name: 'hiscores',
  initialState,
  reducers
});

export const { hiscoresFetched, userHiscoresFetched } = hiscores.actions;

export default hiscores.reducer;
