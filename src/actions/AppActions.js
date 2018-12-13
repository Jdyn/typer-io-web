import * as types from "../constants/ActionTypes";
import io from "socket.io-client";

export const initClient = username => ({
  type: types.INIT_CLIENT,
  username
});

export const connectSocketRequest = pending => ({
  type: types.CONNECT_SOCKET_REQUEST,
  pending
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

  socket.on("onConnected", client => {
    dispatch(connectSocketSuccess(client, socket));
    dispatch(handleRoomUpdates(socket));
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
  var room = {
    id: null,
    playerCount: null,
    clients: [],
    snippet: ""
  };

  socket.emit("LeaveRoom", client);

  socket.on("disconnect", () => {
    socket.emit("LeaveRoom", client);
    dispatch(disconnectSocketSuccess(room));
  });
};

export const handleRoomUpdates = socket => dispatch => {
  socket.on("ClientLeftRoom", room => {
    console.log("a client left the room");
    dispatch(updateClientRoom(room));
  });

  socket.on("ClientJoinedRoom", room => {
    console.log("a client joined room");
    dispatch(updateClientRoom(room));
  });
};

export const updateClientRoom = room => ({
  type: types.UPDATE_CLIENT_ROOM,
  room
});
