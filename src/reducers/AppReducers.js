import * as types from "../constants/ActionTypes";

const initalState = {
  isLoggedIn: false,
  client: {
    id: null,
    username: null,
    isInRoom: false,
    gamePiece: {
      entries: 0,
      wpm: 0,
      cpm: 0,
      errors: 0
    },
    room: {
      id: null,
      playerCount: null,
      clients: [],
      messages: [],
      snippet: ""
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
          inProgress: false
        }
      };

    case types.CONNECT_SOCKET_SUCCESS:
      return {
        ...state,
        client: {
          ...state.client,
          ...action.client
          // room: {}
        },
        socket: {
          ...state.socket,
          io: action.socket,
          inProgress: false
        }
      };

    case types.DISCONNECT_SOCKET:
      return {
        ...state,
        client: {
          ...state.client,
          room: action.room,
          isInRoom: false
        }
      };

    case types.UPDATE_CLIENT_ROOM:
      return {
        ...state,
        client: {
          ...state.client,
          room: action.room
        }
      };

    case types.UPDATE_CLIENT_ROOM_CHAT:
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
            clients: updateGameboard(
              [...state.client.room.clients],
              action.gamePieces
            )
          }
        }
      };

    default:
      return state;
  }
};

const updateGameboard = (clients, gamePieces) => {
  const res = [...clients];
  res.forEach((client, index) => {
    client.gamePiece = gamePieces[index];
  });
  return res;
};

const updateRoomChat = (newMessage, messages) => {
  if (Array.isArray(newMessage)) {
    return newMessage;
  } else {
    const copy = [...messages];
    copy.push(newMessage);
    console.log(copy);
    return copy;
  }
};
