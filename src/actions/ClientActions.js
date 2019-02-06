import types from "../constants/ActionTypes";
import { emitAction, silentEmit } from "../store/socket";
import keyMirror from "../lib/keyMirror";

export const actions = keyMirror("SEND_CHAT_MESSAGE", "CLIENT_UPDATE");

export const updateClient = payload => {
  localStorage.setItem("username", payload.username)
  return { type: actions.CLIENT_UPDATE, payload };
};

export const sendChatMessage = emitAction(payload => ({
  type: actions.SEND_CHAT_MESSAGE,
  payload
}));

export const leaveRoom = payload => {
  silentEmit(types.DISCONNECT_SOCKET, payload);
};

export const initSocket = (username, history) => ({
  type: types.INIT_SOCKET_REQUEST,
  payload: {
    username: username,
    history: history,
    pending: true
  }
});
