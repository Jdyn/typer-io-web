import * as types from '../constants/ActionTypes'
import { API_KEY } from '../constants/Keys'
import { MOVIES_SEARCH_URL } from '../constants/ApiConstants'
import * as requestTypes from '../constants/RequestTypes'
import { setRequestInProgress } from '../actions/Requests';

export const getMoviesErrored = hasErrored => {
  return {
      type: types.GET_MOVIES_ERRORED,
      hasErrored: hasErrored
  };
}

export const getMoviesSuccess = movies => {
  return {
    type: types.GET_MOVIES_SUCCESS,
    movies
  }
}

export const fetchMoviesBySearch = (query) => (dispatch, getState) => {
  const requestType = requestTypes.MOVIES;
  const url = `${MOVIES_SEARCH_URL}?api_key=${API_KEY}&query=${query}`
  const requestInProcess = getState().request[requestType];

  if (requestInProcess) { return; }

  dispatch(setRequestInProgress(true, requestType));

  fetch(url)
  .then(response => response.json())
  .then(movies => {
    dispatch(getMoviesSuccess(movies))
    dispatch(setRequestInProgress(false, requestType));
  })
  .catch(() => dispatch(getMoviesErrored(true)))
}