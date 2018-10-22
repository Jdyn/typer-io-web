import * as types from '../constants/ActionTypes'

export const getMoviesLoading = isLoading => {
  return {
    type: types.GET_MOVIES_LOADING,
    isLoading: isLoading
  }
}

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

export const getMovies = () => {
  return (dispatch) => {
    dispatch(getMoviesLoading(true))

    fetch('https://api.themoviedb.org/3/search/movie?api_key=9c212cbba31e0658488dfb77d0493257&language=en-US&query=bat&page=1')
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      dispatch(getMoviesLoading(false))

      return response
    })
    .then((response) => response.json())
    .then((movies) => dispatch(getMoviesSuccess(movies)))
    // .catch(() => dispatch(getMoviesErrored(true)))
  }
}