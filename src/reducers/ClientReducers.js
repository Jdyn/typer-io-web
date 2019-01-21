import types from "../constants/ActionTypes";

const initialState = {
  meta: {
    id: null,
    username: null,
    isInRoom: false,
    session: {
      id: null,
      isAuthenticating: false,
      isLoggedIn: false,
      firstName: null,
      lastName: null,
      email: null
    }
  },
  room: {
    id: null,
    playerCount: null,
    roomTime: null,
    gameboard: {
      words: [],
      gamePieceIndex: null,
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
    case "CLIENT_UPDATE":
      return {
        ...state,
        meta: {
          ...state.meta,
          ...action.payload
        }
      };

    case types.ROOM_UPDATE:
      return {
        ...state,
        room: {
          ...state.room,
          clients: action.payload.clients
        }
      };

    case types.ROOM_TIMER:
      return {
        ...state,
        room: {
          ...state.room,
          ...action.payload
        }
      };

    case types.START_GAME:
      return {
        ...state,
        room: {
          ...state.room,
          gameboard: {
            ...state.room.gameboard,
            ...action.payload
          }
        }
      };

    case types.GAMEBOARD_UPDATE:
      return {
        ...state,
        room: {
          ...state.room,
          gameboard: {
            ...state.room.gameboard,
            ...action.payload
          },
          clients: gameboardUpdate(
            [...state.room.clients],
            action.payload.gamePieces
          )
        }
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
        room: {
          ...action.payload.room,
          gameboard: {
            ...state.room.gameboard,
            words: action.payload.room.snippet.split(" ") || []
          }
        },
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

    case types.RECIEVE_CHAT_MESSAGE:
      return {
        ...state,
        room: {
          ...state.room,
          messages: updateRoomChat(action.payload, state.room.messages)
        }
      };
    case "LOG_IN_REQUEST":
      return {
        ...state,
        meta: {
          ...state.meta,
          session: {
            ...state.meta.session,
            isAuthenticating: true
          }
        }
      };
    case "LOG_IN_SUCCESS":
    return {
      ...state,
      meta: {
        ...state.meta,
        session: {
          ...state.session,
          isAuthenticating: false,
          isLoggedIn: true,
          ...action.response.data
        }
      }
    }
    default:
      return state;
  }
};

const gameboardUpdate = (clients, gamePieces) => {
  if (gamePieces) {
    const res = [...clients];
    res.forEach((client, index) => {
      client.gamePiece = {
        ...gamePieces[index],
        color: client.gamePiece.color
      };
    });
    return res;
  }
  return clients;
};

const updateRoomChat = (newMessage, messages) => {
  if (Array.isArray(newMessage)) {
    return newMessage;
  } else {
    const copy = [...messages];
    copy.push(newMessage);
    return copy;
  }
};
