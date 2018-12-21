import * as types from "../constants/ActionTypes";

const initalState = {
  isLoggedIn: false,
  client: {
    username: null,
    id: null,
    email: null,
    isInRoom: false,
    CPM: 0, // Characters per Minute
    WPM: 0, // Words per Minute
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
            messages: updateClientRoomChat(action.newMessage, state.client.room.messages)
          }
        }
      };

    default:
      return state;
  }
};

function updateClientRoomChat(newMessage, messages) {
  if (Array.isArray(newMessage)) {
    return newMessage;
  } else {
    const copy = messages.slice();
    copy.push(newMessage);
    console.log(copy);
    return copy;
  }
}
