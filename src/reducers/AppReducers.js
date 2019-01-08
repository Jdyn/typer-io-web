import * as types from "../constants/ActionTypes";

const initalState = {
  isLoggedIn: false,
  client: {
    id: null,
    username: null,
    isInRoom: false,
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
    }
  },
  socket: {
    io: null, // The actual socket object
    pending: false,
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

    case types.CONNECT_SOCKET_REQUEST:
      return {
        ...state,
        socket: {
          ...state.socket,
          pending: action.pending
        }
      };

    case types.CONNECT_SOCKET_ERRORED:
      return {
        ...state,
        socket: {
          ...state.socket,
          hasErrored: action.hasErrored,
          error: action.error,
          pending: false
        }
      };

    case types.CONNECT_SOCKET_SUCCESS:
      return {
        ...state,
        client: {
          ...state.client,
          ...action.client,
          room: {
            ...state.client.room,
            ...action.client.room
          }
        },
        socket: {
          ...state.socket,
          io: action.socket,
          pending: false
        }
      };

    case types.DISCONNECT_SOCKET:
      return {
        ...state,
        client: {
          ...state.client,
          id: null,
          room: action.room,
          isInRoom: false
        },
        socket: {
          ...state.socket,
          io: null
        }
      };

    case types.ROOM_UPDATE:
      return {
        ...state,
        client: {
          ...state.client,
          room: {
            ...state.room,
            ...action.room
          }
        }
      };

    case types.ROOM_TIMER_UPDATE:
      return {
        ...state,
        client: {
          ...state.client,
          room: {
            ...state.client.room,
            timer: action.time
          }
        }
      };

    case types.ROOM_CHAT_UPDATE:
      return {
        ...state,
        client: {
          ...state.client,
          room: {
            ...state.client.room,
            messages: updateRoomChat(action.newMessage, state.client.room.messages)
          }
        }
      };

    case types.GAME_UPDATE:
      return {
        ...state,
        client: {
          ...state.client,
          room: {
            ...state.client.room,
            timer: action.data.timer ? action.data.timer : state.client.room.timer,
            gameboard: {
              ...state.client.room.gameboard,
              isStarted: action.data.isStarted
                ? action.data.isStarted
                : state.client.room.gameboard.isStarted,
              gameTime: action.data.timeRemaining
            },
            clients: updateGameboard(
              [...state.client.room.clients],
              action.data.gamePieces
            )
          }
        }
      };

    default:
      return state;
  }
};

const updateGameboard = (clients, gamePieces) => {
  if (gamePieces) {
    const res = [...clients];
    res.forEach((client, index) => {
      client.gamePiece = { ...gamePieces[index], color: client.gamePiece.color };
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
