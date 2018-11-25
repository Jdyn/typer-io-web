import * as types from '../constants/ActionTypes'

const initialState = {
  socket: null,
  error: {
    hasErrored: false,
    error: null
  },
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
        error: {
          hasErrored: action.hasErrored,
          error: action.error
        }
      }
    
    case types.ESTABLISH_SOCKET_SUCCESS:
    return {
      ...state,
      client: {
        ...state.client,
        id: action.client.id
      },
      inProgress: false
    }

    default: return state
  }
}
