import * as types from "../constants/ActionTypes";

const initalState = {
  isLoggedIn: false,
  isInRoom: false,
  client: {
    username: null,
    id: null,
    email: null,
    CPM: 0, // Characters per Minute
    WPM: 0, // Words per Minute
    room: {
      id: null,
      size: null,
      clients: []
    }
  },
  socket: {
    io: null, // The actual socket object
    inProgress: false,
    hasErrored: false,
    error: null
  }
};

export default (state = initalState, action) => {
  switch (action.type) {
    case types.INIT_CLIENT:
      return {
        ...state,
        client: {
          ...state.client,
          username: action.username
        }
      };

    case types.ESTABLISH_SOCKET_REQUEST:
      return {
        ...state,
        socket: {
          ...state.socket,
          inProgress: action.inProgress
        }
      };

    case types.ESTABLISH_SOCKET_ERRORED:
      return {
        ...state,
        socket: {
          ...state.socket,
          hasErrored: action.hasErrored,
          error: action.error,
          inProgress: false
        }
      };

    case types.ESTABLISH_SOCKET_SUCCESS:
      return {
        ...state,
        client: {
          ...state.client,
          id: action.id
        },
        socket: {
          ...state.socket,
          io: action.socket,
          inProgress: false
        }
      };

    default:
      return state;
  }
};
