/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  post: null,
  feed: {
    recent: {
      posts: null
    },
    page: {
      postPage: 1,
      postMaxPage: 1,
      posts: null
    }
  }
};

const reducers = {
  postsFetched: (state, action) => {
    state.feed[action.payload.key] = action.payload[action.payload.key];
  },
  updatePost: (state, action) => {
    state.post = action.payload.post;
  },
  postCreated: (state, action) => {
    state.post = action.payload.post;
  }
};

const forum = createSlice({
  name: 'forum',
  initialState,
  reducers
});

export const { postsFetched, updatePost, postCreated } = forum.actions;

export default forum.reducer;
