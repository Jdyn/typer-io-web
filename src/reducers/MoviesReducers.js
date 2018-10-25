import {
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_ERRORED,
  FETCH_MOVIES_REQUEST
} from '../constants/ActionTypes'

const initialState = {
  hasErrored: false,
  isLoading: false,
  page: null,
  totalResults: null,
  totalPages: null,
  movies: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIES_ERRORED:
    return {
      ...state,
      hasErrored: action.hasErrored
    }
    case FETCH_MOVIES_REQUEST:
    return {
      ...state,
      isLoading: action.isLoading,
    }
    case FETCH_MOVIES_SUCCESS:
      return {
        ...state,   
        isLoading: false,
        page: action.movies.page,
        totalResults: action.movies.total_results,
        totalPages: action.movies.total_pages,
        movies: action.movies.results
      }
    default:
      return state
  }
}