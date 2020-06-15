import io from 'socket.io-client';
import keyMirror from '../lib/keyMirror';

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
  'STARTING_CUSTOM_GAME'
);

export default (url) => {
  return (store) => (next) => (action) => {
    switch (action.type) {
      case types.INIT_SOCKET_REQUEST:
        const { dispatch } = store;
        const { payload } = action;
        init(url, dispatch, payload);
        return next(action);
      default:
        return next(action);
    }
  };
};

let socket;

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

const defaultListeners = (dispatch) => {
  if (socket) {
    socket.on('disconnect', (reason) => {
      if (socket) {
        socket.close();
        socket = null;
      }
      dispatch({
        type: types.DISCONNECT_SOCKET,
        room: {
          id: null,
          count: null,
          roomTime: null,
          clients: [],
          messages: [],
          snippet: '',
          isSearching: true,
          gameboard: {
            words: [],
            wordsRemaining: [],
            wordsComplete: [],
            isStarted: false,
            gameTime: null
          }
        },
        error: null,
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

    socket.on('ROOM_NOT_FOUND', (payload) => {
      dispatch({
        type: types.ROOM_NOT_FOUND,
        payload: {
          errored: false,
          pending: false,
          error: payload
        }
      });
    });

    socket.on('connect_error', (payload) => {
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

export const silentEmit = (type, payload) => socket && socket.emit(type, payload);
export const silentOn = (type, payload) => socket && socket.on(type, payload);

export const silentClose = () => socket && socket.close();

export const emitAction = (action) => {
  return (...args) => {
    const result = action.apply(this, args);
    if (socket) {
      socket.emit(result.type, result.payload);
    }
    return result;
  };
};
