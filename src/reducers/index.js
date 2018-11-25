import { combineReducers } from 'redux'
import home from './HomeReducers'
import app from './AppReducers'

export default combineReducers({
    app,
    home,
})