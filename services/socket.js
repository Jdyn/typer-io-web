import io from 'socket.io-client';
import keyMirror from '../util/keyMirror';

export const types = keyMirror(
  'ROOM_UPDATE',
  'ROOM_TIMER',
  'START_GAME',
  'END_GAME',
  'GAMEBOARD_UPDATE',
  'RECIEVE_CHAT_MESSAGE',
  'INIT_SOCKET_REQUEST',
  'INIT_SOCKET_SUCCESS',
  'INIT_SOCKET_FAILURE',
  'DISCONNECT_SOCKET',
  'ROOM_NOT_FOUND',
  'STARTING_CUSTOM_GAME',
  'RESETTING_GAME',
  'KICKED'
);

const defaultRoom = {
  id: null,
  count: null,
  roomTime: null,
  clients: [],
  messages: [],
  snippet: '',
  gameboard: {
    words: [],
    wordsRemaining: [],
    wordsComplete: [],
    isStarted: false,
    gameTime: null
  }
};

let socket;

const defaultListeners = (dispatch) => {
  if (socket) {
    socket.on('disconnect', (reason) => {
      if (socket) {
        socket.close();
        socket = null;
      }
      dispatch({
        type: types.DISCONNECT_SOCKET,
        room: defaultRoom,
        error: reason,
        errored: false
      });
    });

    socket.on('INIT_SOCKET_FAILURE', (payload) => {
      dispatch({
        type: types.INIT_SOCKET_FAILURE,
        payload: {
          errored: true,
          pending: false,
          error: payload.error || 'Error connecting to server'
        }
      });
    });

    socket.on('KICKED', (payload) => {
      dispatch({
        type: types.DISCONNECT_SOCKET,
        room: defaultRoom,
        error: payload,
        errored: true,
        kicked: true
      });

      socket.disconnect();
    });

    socket.on('ROOM_NOT_FOUND', (payload) => {
      dispatch({
        type: types.ROOM_NOT_FOUND,
        payload: {
          errored: true,
          pending: false,
          error: payload
        }
      });
    });

    socket.on('connect_error', () => {
      dispatch({
        type: types.INIT_SOCKET_FAILURE,
        payload: {
          errored: true,
          pending: false,
          error: 'Error connecting to server.'
        }
      });

      if (socket) {
        socket.close();
        socket = null;
      }
    });
  }
};

const init = (url, dispatch, payload) => {
  socket = io(url, { transports: ['websocket'] });
  defaultListeners(dispatch);
  socket.emit('REGISTER', payload);
  socket.on(types.INIT_SOCKET_SUCCESS, (payload) => {
    dispatch({ type: types.INIT_SOCKET_SUCCESS, payload });
    Object.keys(types).forEach((key) =>
      socket.on(key, (payload) => {
        dispatch({ type: key, payload });
      })
    );
  });
};

const middleware = (url) => {
  return (store) => (next) => (action) => {
    const { dispatch } = store;
    const { payload } = action;

    switch (action.type) {
      case types.INIT_SOCKET_REQUEST:
        init(url, dispatch, payload);
        return next(action);
      default:
        return next(action);
    }
  };
};

export const silentEmit = (type, payload) =>
  socket && socket.emit(type, payload);

export const silentOn = (type, payload) => socket && socket.on(type, payload);

export const silentClose = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }

  socket = null;
}

export const emitAction = (action) => {
  return (...args) => {
    const result = action.apply(this, args);
    if (socket) {
      socket.emit(result.type, result.payload);
    }
    return result;
  };
};

export default middleware;
