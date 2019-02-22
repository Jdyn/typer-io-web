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
  ApiService.post("/sessions/login", form)
    .then(response => {
      console.log(response);
      if (response.ok) {
        setCurrentSession(dispatch, response);
      } else {
        dispatch({ type: actions.AUTHENTICATION_FAILURE, response });
      }
    })
    .catch(error => {
      console.log(error);
      dispatch({
        type: actions.AUTHENTICATION_FAILURE,
        response: { error: "Error connecting to server" }
      });
    });
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
  ApiService.post("/sessions/signup", form)
    .then(response => {
      if (response.ok) {
        setCurrentSession(dispatch, response);
      } else {
        dispatch({ type: actions.AUTHENTICATION_FAILURE, response });
      }
    })
    .catch(error => {
      dispatch({
        type: actions.AUTHENTICATION_FAILURE,
        response: { error: "Error connecting to server" }
      });
    });
};

export const authenticate = () => dispatch => {
  console.log(localStorage.getItem("token"));
  dispatch({ type: actions.AUTHENTICATION_REQUEST });
  ApiService.post("/sessions/refresh")
    .then(response => {
      if (response.ok) {
        setCurrentSession(dispatch, response);
      } else {
        localStorage.removeItem("token");
        dispatch({
          type: actions.AUTHENTICATION_FAILURE,
          response: { error: "invalid token" }
        });
      }
    })
    .catch(error => {
      localStorage.removeItem("token");
      dispatch({
        type: actions.AUTHENTICATION_FAILURE,
        response: { error: "Error Connecting to server" }
      });
    });
};

export const clearSessionErrors = () => ({
  type: "CLEAR_SESSION_ERRORS",
  payload: {
    error: "",
    errors: {},
    errored: false
  }
});

const setCurrentSession = (dispatch, response) => {
  localStorage.setItem("token", JSON.stringify(response.result.token));
  dispatch({
    type: actions.AUTHENTICATION_SUCCESS,
    response
  });
};
