import * as types from '../constants/ActionTypes'

const initialState = {
  socket: null,
  hasErrored: false,
  inProgress: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    
    case types.ESTABLISH_SOCKET_REQUEST:
      return {
        ...state,
        inProgress: action.inProgress
      }

    case types.ESTABLISH_SOCKET_ERRORED:
      return {
        ...state,
        hasErrored: action.hasErrored
      }

    case types.ESTABLISH_SOCKET_SUCCESS:
    return {
      ...state,
      inProgress: false
    }

    default: return state
  }
}
