/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { ForumState } from './types';

const initialState: ForumState = {
  post: null,
  feed: {
    page: null,
    total: null,
    totalPages: null,
    data: []
  },
  recent: {
    page: null,
    total: null,
    totalPages: null,
    data: []
  }
};

const reducers = {
  postsFetched: (state, action) => {
    state[action.payload.query] = action.payload.result;
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
