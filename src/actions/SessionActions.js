import ApiService from "../services/ApiService";
import keyMirror from "../lib/keyMirror";

export const actions = keyMirror(
  "AUTHENTICATION_REQUEST",
  "AUTHENTICATION_FAILURE",
  "AUTHENTICATION_SUCCESS",
  "SIGN_UP",
  "LOG_OUT"
);

export const handleAuth = (form, type) => dispatch => {
  switch (type) {
    case "LOG IN":
      dispatch(login(form));
      break;
    case "LOG OUT":
      dispatch(logout());
      break;
    case "SIGN UP":
      dispatch(signup(form));
      break;
    default:
      dispatch({
        type: actions.AUTHENTICATION_FAILURE,
        response: { error: "internal client error" }
      });
  }
};

const login = form => dispatch => {
  dispatch({ type: actions.AUTHENTICATION_REQUEST });
  ApiService.post("/signin", form)
    .then(response => {
      if (response.ok) {
        if (response.result.user.token) {
          const jsonToken = response.result.user.token;
          localStorage.setItem("token", JSON.stringify(jsonToken));
        }
        dispatch({
          type: actions.AUTHENTICATION_SUCCESS,
          response
        });
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

export const logout = () => dispatch => {
  ApiService.delete("/signout")
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
  ApiService.post("/signup", form)
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
  dispatch({ type: actions.AUTHENTICATION_REQUEST });
  ApiService.post("/refresh")
    .then(response => {
      if (response.ok) {
        if (response.result.token) {
          const jsonToken = response.result.token;
          localStorage.setItem("token", JSON.stringify(jsonToken));
        }
        dispatch({
          type: actions.AUTHENTICATION_SUCCESS,
          response
        });
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
  if (response.result.token) {
    const jsonToken = response.result.token;
    localStorage.setItem("token", JSON.stringify(jsonToken));
  }
  dispatch({
    type: actions.AUTHENTICATION_SUCCESS,
    response
  });
};
