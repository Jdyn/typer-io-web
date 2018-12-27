import * as types from "../constants/ActionTypes";
import io from "socket.io-client";

export const connectSocket = (serverUrl, client) => dispatch => {
  dispatch(connectSocketRequest(true));
  const socket = io(serverUrl);

  socket.emit("register", client.username);

  socket.on("onConnected", client => {
    dispatch(connectSocketSuccess(client, socket));
    dispatch(handleRoomUpdates(socket));
    dispatch(handleGameUpdates(socket));
  });

  socket.on("connect_error", error => {
    dispatch(connectSocketErrored(true, error));
    socket.close();
  });
};

export const disconnectSocket = (socket, client) => dispatch => {
  const room = {
    id: null,
    playerCount: null,
    clients: [],
    messages: [],
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
    dispatch(updateRoom(room));
  });

  socket.on("ClientJoinedRoom", room => {
    dispatch(updateRoom(room));
  });

  socket.on("connectChat", messages => {
    dispatch(updateRoomChat(messages));
  });

  socket.on("newMessage", newMessage => {
    dispatch(updateRoomChat(newMessage));
  });
};

export const handleGameUpdates = socket => dispatch => {
  socket.on("gameboardUpdate", gamePieces => {
    dispatch(updateGame(gamePieces));
  });
};

export const updateGame = gamePieces => ({
  type: types.GAME_UPDATE,
  gamePieces
});

export const disconnectSocketSuccess = room => ({
  type: types.DISCONNECT_SOCKET,
  room
});

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

export const updateRoomChat = newMessage => ({
  type: types.UPDATE_CLIENT_ROOM_CHAT,
  newMessage
});

export const updateRoom = room => ({
  type: types.UPDATE_CLIENT_ROOM,
  room
});
