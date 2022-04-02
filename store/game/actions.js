import { silentClose, emit, types } from '../../services/socket';
import keyMirror from '../../util/keyMirror';

const defaultRoom = {
  id: null,
  count: null,
  roomTime: null,
  clients: [],
  messages: [],
  snippet: '',
  gameboard: {
    words: [],
    wordsRemaining: [],
    wordsComplete: [],
    isStarted: false,
    clientsComplete: 0,
    gameTime: null
  }
};

export const actions = keyMirror('SEND_CHAT_MESSAGE', 'CLIENT_UPDATE');

export const updateClient = (payload) => {
  localStorage.setItem('username', payload.username);
  return { type: actions.CLIENT_UPDATE, payload };
};

export const sendChatMessage = (payload) => emit(actions.SEND_CHAT_MESSAGE, payload);

export const initSocket = (user, config) => {
  return {
    type: types.INIT_SOCKET_REQUEST,
    payload: {
      user,
      config
    }
  };
};
