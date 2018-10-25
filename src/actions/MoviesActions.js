import * as types from '../constants/ActionTypes'
import { API_KEY } from '../constants/Keys'
import { MOVIES_SEARCH_URL } from '../constants/ApiConstants'

export const fetchMoviesRequest = isLoading => ({
  type: types.FETCH_MOVIES_REQUEST,
  isLoading
})

export const fetchMoviesErrored = hasErrored => ({
  type: types.FETCH_MOVIES_ERRORED,
  hasErrored
})

export const fetchMoviesSuccess = movies => {
  return {
    type: types.FETCH_MOVIES_SUCCESS,
    movies
  }
}

export const fetchMovies = (query) => (dispatch, getState) => {
  dispatch(fetchMoviesRequest(true))
  const url = `${MOVIES_SEARCH_URL}?api_key=${API_KEY}&query=${query}`

  fetch(url)
  .then(response => response.json())
  .then(movies => {
    dispatch(fetchMoviesSuccess(movies))
  })
  .catch(() => dispatch(fetchMoviesErrored(true)))
}