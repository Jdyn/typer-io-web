import io from "socket.io-client";
import types from "../constants/ActionTypes";

export default url => {
  return store => next => action => {
    switch (action.type) {
      case types.INIT_SOCKET_REQUEST:
        const { dispatch } = store;
        const { payload } = action;
        init(url, dispatch, payload);
    }
    return next(action);
  };
};

let socket;

const init = (url, dispatch, payload) => {
  socket = io(url, { reconnection: false });
  defaultListeners(dispatch);
  Object.keys(types).forEach(key =>
    socket.on(key, payload => {
      dispatch({ type: key, payload });
    })
  );
  socket.emit("REGISTER", payload.username);
};

const defaultListeners = dispatch => {
  if (socket) {
    socket.on("disconnect", () => {
      socket = null;
      dispatch({
        type: types.DISCONNECT_SOCKET
      });
    });

    socket.on("connect_error", payload => {
      dispatch({
        type: types.INIT_SOCKET_FAILURE,
        payload: {
          errored: true,
          pending: false,
          error: payload
        }
      });
      socket.close();
    });
  }
};

export const leaveRoom = payload => {
  if (socket) {
    socket.emit(types.DISCONNECT_SOCKET, payload);
  }
};

export const emitAction = action => {
  return (...args) => {
    const result = action.apply(this, args);
    if (socket) {
      socket.emit(result.type, result.payload);
    }
    return result;
  };
};
