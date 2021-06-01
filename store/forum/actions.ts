import { Dispatch } from '@reduxjs/toolkit';
import Api from '../../services/api';
import { forumRequests, PostQueryTypes } from './types';
import { emptyRequest } from '../request/types';
import { setRequest } from '../request/actions';
import { AppState, GetState } from '..';
import { postsFetched, updatePost, postCreated } from './reducers';

export const fetchPost = (postId: string) => async (
  dispatch: Dispatch,
  getState: () => AppState
): Promise<void> => {
  const requestType = forumRequests.FETCH_POST_BY_ID;
  const request = getState().request[requestType] ?? emptyRequest;

  if (request.isPending) return;

  dispatch(setRequest(true, requestType));

  const response = await Api.fetch(`/forum/post/${postId}`);

  if (response.ok) {
    dispatch(updatePost({ post: response.result.post }));
    dispatch(setRequest(false, requestType));
  } else {
    dispatch(setRequest(false, requestType, response.error));
  }
};

export const fetchPosts = (query: PostQueryTypes, page = '1') => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  const requestType = forumRequests[`FETCH_POSTS_BY_${query.toUpperCase()}`];
  const request = getState().request[requestType] ?? emptyRequest;

  if (request.isPending) return;

  dispatch(setRequest(true, requestType));

  const response = await Api.fetch(`/forum/posts?query=${query}&page=${page}`);

  if (response.ok) {
    dispatch(
      postsFetched({
        query,
        result: response.result
      })
    );

    dispatch(setRequest(false, requestType));
  } else {
    dispatch(setRequest(false, requestType, response.error));
  }
};

export const createPost = (form) => async (
  dispatch: Dispatch,
  getState: () => AppState
): Promise<void> => {
  const requestType = forumRequests.CREATE_NEW_POST;
  const request = getState().request[requestType] ?? emptyRequest;

  if (request.isPending) return;

  dispatch(setRequest(true, requestType));

  const response = await Api.post(`/forum/post`, form);

  if (response.ok) {
    dispatch(postCreated({ post: response.result.post }));
    dispatch(setRequest(false, requestType));
  } else {
    const error = response?.errors
      ? `${Object.keys(response?.errors)[0] || ''} ${
          response?.errors[Object.keys(response?.errors)[0]][0]
        }`
      : 'An error has occured. Please ensure you are logged in.';

    dispatch(setRequest(false, requestType, error));
  }
};
