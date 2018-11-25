import * as types from '../constants/ActionTypes'

const initalState = {
  isLoggedIn: false,
  client: {
    username: null,
    id: null,
    email: null,
    CPM: 0, // Characters per Minute
    WPM: 0 // Words per Minute
  }
}

export default (state = initalState, action) => {
  switch (action.type) {

    case types.INIT_CLIENT:
    return {
        ...state,
        client: {
            ...state.client,
            username: action.username
        }
    }
    default: return state
  }
}
