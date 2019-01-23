import types from "../constants/ActionTypes";
import { emitAction } from "../store/socket";
import keyMirror from "../lib/keyMirror";
import ApiService from "../services/ApiService";

export const actions = keyMirror("SEND_CHAT_MESSAGE", "CLIENT_UPDATE");

export const updateClient = payload => ({
  type: actions.CLIENT_UPDATE,
  payload
});

export const sendChatMessage = emitAction(payload => ({
  type: actions.SEND_CHAT_MESSAGE,
  payload
}));

export const gameboardUpdate = payload => ({
  type: types.GAMEBOARD_UPDATE,
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

export const login = payload => dispatch => {
  dispatch({ type: "LOG_IN_REQUEST" });
  ApiService.post("/sessions/login", payload).then(response => {
    if (response.ok) {
      setCurrentSession(dispatch, response);
    } else {
      dispatch({ type: "LOG_IN_FAILURE", response });
    }
  });
};

export const logout = payload => dispatch => {};

export const authenticate = () => dispatch => {
  ApiService.post("/sessions/refresh")
    .then(response => {
      verifyCurrentSession(dispatch, response);
    })
    .catch(() => {
      localStorage.removeItem("token");
      dispatch({ type: "AUTHENTICATION_FAILURE" });
    });
};

const verifyCurrentSession = (dispatch, response) => {
  localStorage.setItem("token", JSON.stringify(response.result.token));
  dispatch({ type: "AUTHENTICATION_SUCCESS", response });
};

const setCurrentSession = (dispatch, response) => {
  localStorage.setItem("token", JSON.stringify(response.result.token));
  dispatch({ type: "LOG_IN_SUCCESS", response });
};
