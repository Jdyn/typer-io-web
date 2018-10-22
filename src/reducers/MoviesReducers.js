import { GET_MOVIES_SUCCESS, GET_MOVIES_ERRORED, GET_MOVIES_LOADING } from '../constants/ActionTypes'

export function movies(state = [], action) {
  switch (action.type) {
    case GET_MOVIES_SUCCESS:
      return action.movies
    default:
      return state
  }
}

export function moviesHasErrored(state = false, action) {
  switch (action.type) {
    case GET_MOVIES_ERRORED:
      return action.hasErrored
    default:
      return state
  }
}

export function moviesIsLoading(state = false, action) {
  switch (action.type) {
    case GET_MOVIES_LOADING:
      return action.isLoading
    default:
      return state
  }
}