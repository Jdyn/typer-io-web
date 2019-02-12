import keyMirror from "../lib/keyMirror";

const types = keyMirror(
  "ROOM_UPDATE",
  "ROOM_TIMER",
  "START_GAME",
  "END_GAME",
  "GAMEBOARD_UPDATE",
  "RECIEVE_CHAT_MESSAGE",
  "INIT_SOCKET_REQUEST",
  "INIT_SOCKET_SUCCESS",
  "INIT_SOCKET_FAILURE",
  "DISCONNECT_SOCKET",
  "ROOM_NOT_FOUND"
);

export default types;