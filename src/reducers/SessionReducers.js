import { actions } from "../actions/SessionActions";

const initialState = {
  id: null,
  isAuthenticating: false,
  isLoggedIn: false,
  firstName: null,
  lastName: null,
  email: null,
  username: null,
  errors: {},
  errored: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.AUTHENTICATION_REQUEST:
      return {
        ...state,
        isAuthenticating: true
      };
    case actions.AUTHENTICATION_SUCCESS:
      return {
        ...state,
        isAuthenticating: false,
        isLoggedIn: true,
        ...action.response.result.user,
        error: "",
        errored: false
      };
    case actions.AUTHENTICATION_FAILURE:
      return {
        ...state,
        isAuthenticating: false,
        isLoggedIn: false,
        error: action.response.error,
        errors: {
          ...(action.response ? action.response.errors : "")
        },
        errored: true
      };
    case "CLEAR_SESSION_ERRORS":
      return {
        ...state,
        ...action.payload
      };

    case actions.LOG_OUT:
      return {
        username: "",
        id: null,
        isAuthenticating: false,
        isLoggedIn: false,
        firstName: null,
        lastName: null,
        email: null,
        error: null,
        errors: {},
        errored: false
      };
    default:
      return state;
  }
};
