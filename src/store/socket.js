import io from "socket.io-client";
import types from "../actions/types/SocketTypes";

export default url => {
  let socket;

  return store => next => action => {
    switch (action.type) {
      case types.INIT_SOCKET_REQUEST:
        const { dispatch } = store;
        const payload = action.payload;
        socket = io(url, { reconnection: false });
        init(dispatch, socket, payload);
        defaultListeners(dispatch, socket, action);
      default:
        break;
    }

    return next(action);
  };
};

const init = (dispatch, socket, payload) => {
  socket.emit("REGISTER", payload.username);

  Object.keys(types).forEach(key =>
    socket.on(key, payload => {
      dispatch({ type: key, payload });
    })
  );
};

const defaultListeners = (dispatch, socket, action) => {
  socket.on("connect", () => {
    dispatch({
      type: types.INIT_SOCKET_SUCCESS,
      ...socket.connected
    });
  });

  socket.on("disconnect", () => {
    console.log("disconnect: ");
  });

  socket.on("connect_error", payload => {
    console.log("connect_error: ", payload);
  });
};
