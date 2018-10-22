import { combineReducers } from 'redux'
import { movies, moviesHasErrored, moviesIsLoading } from './MoviesReducers'

export default combineReducers({
    movies,
    moviesHasErrored,
    moviesIsLoading
})