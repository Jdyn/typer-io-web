/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  post: null,
  feed: {
    recent: {
      posts: null
    },
    page: {
      posts: null
    }
  }
};

const reducers = {
  postsFetched: (state, action) => {
    state.feed[action.payload.key] = action.payload[action.payload.key];
  },
  postUpdated: (state, action) => {
    state.post = action.payload.post;
  }
};

const forum = createSlice({
  name: 'forum',
  initialState,
  reducers
});

export const { postsFetched, postUpdated } = forum.actions;

export default forum.reducer;
