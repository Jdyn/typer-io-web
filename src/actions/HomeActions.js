import io from "socket.io-client";
import * as types from "../constants/ActionTypes";

export const establishSocketRequest = inProgress => ({
  type: types.ESTABLISH_SOCKET_REQUEST,
  inProgress
});

export const establishSocketErrored = (hasErrored, error) => ({
  type: types.ESTABLISH_SOCKET_ERRORED,
  hasErrored,
  error
});

export const establishSocketSuccess = (client, socket) => ({
  type: types.ESTABLISH_SOCKET_SUCCESS,
  client,
  socket
});

export const establishSocket = (serverUrl, username) => dispatch => {
  dispatch(establishSocketRequest(true));
  const socket = io(serverUrl);

  socket.emit("register", username);

  socket.on("connect", () => {
    socket.on("connected", client => {
      dispatch(establishSocketSuccess(client, socket));
    });
  });

  // reserved Socket.io param
  socket.on("connect_error", error => {
    dispatch(establishSocketErrored(true, error));
    socket.close();
  });
};
