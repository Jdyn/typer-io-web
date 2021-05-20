import { types, silentEmit, silentClose } from '../../services/socket';
import keyMirror from '../../util/keyMirror';

export const actions = keyMirror('SEND_CHAT_MESSAGE', 'CLIENT_UPDATE');

export const updateClient = (payload) => {
  localStorage.setItem('username', payload.username);
  return { type: actions.CLIENT_UPDATE, payload };
};

export const sendChatMessage = (payload) =>
  silentEmit(actions.SEND_CHAT_MESSAGE, payload);

export const leaveRoom = () => silentClose();
// silentEmit(types.DISCONNECT_SOCKET, payload);

export const initSocket = (user, config) => {
  return {
    type: types.INIT_SOCKET_REQUEST,
    payload: {
      user,
      config
    }
  };
};
