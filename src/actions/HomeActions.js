import io from "socket.io-client";
import * as types from "../constants/ActionTypes";

export const establishSocketRequest = inProgress => ({
  type: types.ESTABLISH_SOCKET_REQUEST,
  inProgress
});

export const establishSocketErrored = hasErrored => ({
  type: types.ESTABLISH_SOCKET_ERRORED,
  hasErrored
});

export const establishSocketSuccess = (client, socket) => ({
  type: types.ESTABLISH_SOCKET_SUCCESS,
  client,
  socket
});

export const establishSocket = (serverUrl, client) => dispatch => {
  dispatch(establishSocketRequest(true));
  const socket = io(serverUrl);

  socket.emit("register", client.username, data => {
    console.log(data);
    socket.on("connect", () => {
      socket.on("connected", client => {
        dispatch(establishSocketSuccess(client, socket));
      });
    });
  });

  // reserved Socket.io param
  socket.on("connect_error", () => {
    dispatch(establishSocketErrored(true));
    socket.close();
  });
};