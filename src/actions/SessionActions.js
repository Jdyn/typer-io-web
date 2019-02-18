import ApiService from "../services/ApiService";
import keyMirror from "../lib/keyMirror";

export const actions = keyMirror(
  "AUTHENTICATION_REQUEST",
  "AUTHENTICATION_FAILURE",
  "AUTHENTICATION_SUCCESS",
  "SIGN_UP",
  "LOG_OUT"
);

export const login = form => dispatch => {
  dispatch({ type: actions.AUTHENTICATION_REQUEST });
  ApiService.post("/sessions/login", form).then(response => {
    if (response.ok) {
      setCurrentSession(dispatch, response);
    } else {
      dispatch({ type: actions.AUTHENTICATION_FAILURE, response });
    }
  })
  .catch(response =>{
    dispatch({ type: actions.AUTHENTICATION_FAILURE, response });
  })
};

export const logout = () => dispatch => {
  ApiService.delete("/sessions/logout")
    .then(() => {
      dispatch({ type: "LOG_OUT" });
      localStorage.removeItem("token");
    })
    .catch(() => {
      dispatch({ type: "LOG_OUT" });
      localStorage.removeItem("token");
    });
};

export const signup = form => dispatch => {
  ApiService.post("/sessions/signup", form).then(response => {
    if (response.ok) {
      setCurrentSession(dispatch, response);
    } else {
      dispatch({ type: actions.AUTHENTICATION_FAILURE, response });
    }
  });
};

export const authenticate = () => dispatch => {
  dispatch({ type: actions.AUTHENTICATION_REQUEST });
  ApiService.post("/sessions/refresh")
    .then(response => {
      setCurrentSession(dispatch, response);
    })
    .catch(() => {
      localStorage.removeItem("token");
      dispatch({ type: actions.AUTHENTICATION_FAILURE });
    });
};

const setCurrentSession = (dispatch, response) => {
  localStorage.setItem("token", JSON.stringify(response.result.token));
  const localUsername = localStorage.getItem("username")
  dispatch({ type: actions.AUTHENTICATION_SUCCESS, response: {localUsername, ...response} });
};
