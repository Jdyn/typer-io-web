import keyMirror from "../lib/keyMirror";

const types = keyMirror(
  "UPDATE_CLIENT",
  "UPDATE_ROOM",
  "UPDATE_GAMEBOARD",
  "INIT_SOCKET_REQUEST",
  "INIT_SOCKET_SUCCESS",
  "INIT_SOCKET_FAILURE",
  "LEAVE_ROOM",
  "DISCONNECT_SOCKET"
);

export default types;