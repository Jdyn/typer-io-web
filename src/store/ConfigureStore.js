import { createStore } from 'redux'
import rootReducer from '../reducers/index'

export default function configureStore(initialState) {
  const reduxTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  const store = createStore(rootReducer, initialState, reduxTools)

  return store
}