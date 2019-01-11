import types from "../constants/ActionTypes";

const initialState = {
  meta: {
    id: null,
    username: null,
    isInRoom: false
  },
  room: {
    id: null,
    playerCount: null,
    timer: null,
    gameboard: {
      isStarted: false,
      gameTime: null
    },
    clients: [],
    messages: [],
    snippet: "",
    isSearching: true
  },
  socket: {
    connected: false,
    pending: false,
    errored: false,
    error: null
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_CLIENT:
      return {
        ...state,
        ...action.payload
      };

    case types.INIT_SOCKET_REQUEST:
      return {
        ...state,
        socket: {
          ...state.socket,
          pending: true
        }
      };

    case types.INIT_SOCKET_FAILURE:
      return {
        ...state,
        socket: {
          ...state.socket,
          ...action.payload
        }
      };

    case types.INIT_SOCKET_SUCCESS:
      return {
        ...state,
        meta: {
          id: action.payload.id,
          username: action.payload.username,
          isInRoom: action.payload.isInRoom
        },
        room: action.payload.room,
        socket: {
          ...state.socket,
          connected: true,
          pending: false
        }
      };

    case types.DISCONNECT_SOCKET:
      return {
        ...state,
        room: action.room,
        socket: {
          ...state.socket,
          connected: false
        }
      };
    default:
      return state;
  }
};
