import * as types from "../constants/ActionTypes";
import io from "socket.io-client";

export const initClient = username => ({
  type: types.INIT_CLIENT,
  username
});

export const connectSocketRequest = inProgress => ({
  type: types.CONNECT_SOCKET_REQUEST,
  inProgress
});

export const connectSocketErrored = (hasErrored, error) => ({
  type: types.CONNECT_SOCKET_ERRORED,
  hasErrored,
  error
});

export const connectSocketSuccess = (client, socket) => ({
  type: types.CONNECT_SOCKET_SUCCESS,
  client,
  socket
});

export const connectSocket = (serverUrl, client) => dispatch => {
  dispatch(connectSocketRequest(true));
  const socket = io(serverUrl);

  socket.emit("register", client.username);

  socket.on("connected", client => {
    dispatch(connectSocketSuccess(client, socket));
  });

  socket.on("connect_error", error => {
    dispatch(connectSocketErrored(true, error));
    socket.close();
  });
};

export const disconnectSocketSuccess = room => ({
  type: types.DISCONNECT_SOCKET,
  room
});

export const disconnectSocket = (socket, client) => dispatch => {
  var room = null;

  socket.emit("LeaveRoom", client);
  socket.on("ClientLeftRoom", data => {
    room = data;
    socket.disconnect();
    console.log("socket is disconnected");
  });

  socket.on("disconnect", () => {
    console.log("socket disconnect called");
    console.log("here is what the new room object is", room);
    dispatch(disconnectSocketSuccess(room));
  });
};

export const updateRoom = () => dispatch => {};
