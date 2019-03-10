import { types } from "../services/socket";
import { silentEmit, silentClose } from "../services/socket";
import keyMirror from "../lib/keyMirror";

export const actions = keyMirror("SEND_CHAT_MESSAGE", "CLIENT_UPDATE");

export const updateClient = payload => {
  localStorage.setItem("username", payload.username);
  return { type: actions.CLIENT_UPDATE, payload };
};

export const sendChatMessage = payload => silentEmit(actions.SEND_CHAT_MESSAGE, payload);

export const leaveRoom = payload => silentClose();
// silentEmit(types.DISCONNECT_SOCKET, payload);

export const initSocket = (username, payload) => ({
  type: types.INIT_SOCKET_REQUEST,
  payload: {
    username,
    ...payload
  }
});
