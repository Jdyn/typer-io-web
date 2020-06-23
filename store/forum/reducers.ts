/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  post: {},
  feed: {
    recent: {
      posts: null
    },
    page: {}
  }
};

const reducers = {
  postsFetched: (state, action) => {
    state.feed[action.payload.key] = action.payload[action.payload.key];
  }
};

const forum = createSlice({
  name: 'forum',
  initialState,
  reducers
});

export const { postsFetched } = forum.actions;

export default forum.reducer;
