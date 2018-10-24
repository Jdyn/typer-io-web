import {
  GET_MOVIES_SUCCESS,
  GET_MOVIES_ERRORED
} from '../constants/ActionTypes'

const initialState = {
  hasErrored: false,
  movies: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIES_SUCCESS:
      return {
        ...state,
        movies: action.movies,
      }
    case GET_MOVIES_ERRORED:
      return {
        ...state,
        hasErrored: action.hasErrored
      }
    default:
      return state
  }
}