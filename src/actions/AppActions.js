import * as types from "../constants/ActionTypes";
import io from "socket.io-client";

export const initClient = username => ({
  type: types.INIT_CLIENT,
  username
});

export const establishSocketRequest = inProgress => ({
  type: types.ESTABLISH_SOCKET_REQUEST,
  inProgress
});

export const establishSocketErrored = (hasErrored, error) => ({
  type: types.ESTABLISH_SOCKET_ERRORED,
  hasErrored,
  error
});

export const establishSocketSuccess = (id, socket) => ({
  type: types.ESTABLISH_SOCKET_SUCCESS,
  id,
  socket
});

export const establishSocket = (serverUrl, username) => dispatch => {
  dispatch(establishSocketRequest(true));
  const socket = io(serverUrl);

  socket.emit("register", username);

  socket.on("connect", () => {
    socket.on("connected", id => {
      dispatch(establishSocketSuccess(id, socket))
    });
  });

  socket.on('disconnect', () => {
      console.log('Disconnected from server')
  })

  // reserved Socket.io param
  socket.on("connect_error", error => {
    dispatch(establishSocketErrored(true, error));
    socket.close();
  });
};
