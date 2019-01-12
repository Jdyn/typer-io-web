import keyMirror from "../lib/keyMirror";

const types = keyMirror(
  "CLIENT_UPDATE",
  "ROOM_UPDATE",
  "START_GAME",
  "GAMEBOARD_UPDATE",
  "INIT_SOCKET_REQUEST",
  "INIT_SOCKET_SUCCESS",
  "INIT_SOCKET_FAILURE",
  "DISCONNECT_SOCKET"
);

export default types;