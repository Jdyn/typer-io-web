import types from "./types/SocketTypes";
import { emitAction, deinit } from "../store/socket";

export const updateClient = payload => ({
  type: types.UPDATE_CLIENT,
  payload
});

export const initSocket = (username, history) => ({
  type: types.INIT_SOCKET_REQUEST,
  payload: {
    username: username,
    history: history,
    pending: true
  }
});

// export const disconnectSocket = payload => {
//   leaveRoom(payload.id);
// };
