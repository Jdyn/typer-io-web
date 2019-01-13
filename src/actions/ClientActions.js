import types from "../constants/ActionTypes";
import { emitAction } from "../store/socket";
import keyMirror from '../lib/keyMirror'

const actions = keyMirror(
  "SEND_CHAT_MESSAGE"
)

export const updateClient = payload => ({
  type: types.UPDATE_CLIENT,
  payload
});

export const sendChatMessage = emitAction(payload => ({
  type: actions.SEND_CHAT_MESSAGE,
  payload
}))

export const gameboardUpdate = payload => ({
  type: types.GAMEBOARD_UPDATE,
  payload
})

export const initSocket = (username, history) => ({
  type: types.INIT_SOCKET_REQUEST,
  payload: {
    username: username,
    history: history,
    pending: true
  }
});
