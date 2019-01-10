import types from "../actions/types/ClientTypes";

const initialState = {
  id: null,
  username: null,
  isInRoom: false,
  room: {
    id: null,
    count: null,
    roomTime: null,
    snippet: null,
    isSearching: null,
    clients: [],
    messages: [],
    gameboard: {
      isStarted: false,
      gameTime: null
    }
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
      }

    case "ON_CONNECTION":
      return {
        ...state,
        id: action.payload.id,
        username: action.payload.username,
        isInRoom: action.payload.isInRoom
      };
    default:
      return state;
  }
};
