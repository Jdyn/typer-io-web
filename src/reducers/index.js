import { combineReducers } from 'redux'
import movies from './MoviesReducers'
import request from './Request'
export default combineReducers({
    movies,
    request
})