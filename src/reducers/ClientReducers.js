import { types } from '../services/socket';

const initialState = {
  meta: {
    id: null,
    username: '',
    isInRoom: false
  },
  room: {
    id: null,
    playerCount: null,
    roomTime: null,
    isStarting: false,
    gameboard: {
      words: [],
      isStarted: false,
      isOver: false,
      text: null,
      gameTime: null
    },
    clients: [],
    messages: [],
    snippet: {},
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
    case 'CLIENT_UPDATE':
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
          ...action.payload.room,
          gameboard: {
            ...state.room.gameboard,
            ...action.payload.gameboard
          }
        }
      };
    case types.END_GAME:
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
            gameTime: action.payload.gameTime
          },
          clients: gameboardUpdate([...state.room.clients], action.payload.gamePieces)
        }
      };

    case types.STARTING_CUSTOM_GAME:
      return {
        ...state,
        room: {
          ...state.room,
          isStarting: true
        }
      };

    case types.INIT_SOCKET_REQUEST:
      return {
        ...state,
        socket: {
          ...state.socket,
          pending: true,
          mode: action.payload.config.mode
        }
      };

    case types.INIT_SOCKET_FAILURE:
      return {
        ...state,
        socket: {
          ...state.socket,
          ...action.payload,
          errored: true
        }
      };

    case types.INIT_SOCKET_SUCCESS:
      return {
        ...state,
        meta: {
          ...state.meta,
          id: action.payload.id,
          username: action.payload.username,
          isInRoom: action.payload.isInRoom
        },
        room: {
          ...action.payload.room,
          gameboard: {
            ...state.room.gameboard,
            words: action.payload.room.snippet.quote.split(' ') || []
          }
        },
        socket: {
          ...state.socket,
          connected: true,
          errored: false,
          pending: false
        }
      };

    case types.DISCONNECT_SOCKET:
      return {
        ...state,
        room: action.room,
        socket: {
          ...state.socket,
          pending: false,
          connected: false,
          error: action.error ? action.error : state.socket.error,
          errored: action.errored
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
    case 'ROOM_NOT_FOUND':
      return {
        ...state,
        socket: {
          ...action.payload,
          errored: true
        }
      };
    default:
      return state;
  }
};

const gameboardUpdate = (clients, gamePieces) => {
  if (gamePieces) {
    const res = [...clients];
    res.forEach((client, index) => {
      client.gamePiece = {
        ...client.gamePiece,
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
