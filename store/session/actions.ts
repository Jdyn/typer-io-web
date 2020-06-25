import cookie from 'js-cookie';
import Router from 'next/router';
import Api from '../../services/api';
import { setRequest } from '../request/actions';
import { AppState } from '..';
import { actions, requests } from './types';

const setCurrentSession = (user): void => {
  if (user.token) {
    const jsonToken = user.token;
    cookie.set('token', jsonToken);
  }
};

const setLogin = (user) => ({
  type: actions.LOG_IN,
  isLoggedIn: true,
  user
});

const login = (
  form: object,
  redirect?: string
): ((dispatch: Function, getState: () => AppState) => void) => (dispatch, getState): void => {
  const requestType = requests.AUTHENTICATE;
  const request = getState().request[requestType] || { isPending: false };

  if (request.isPending) return;

  dispatch(setRequest(true, requestType));

  Api.post('/account/login', form)
    .then((response): void => {
      const { ok, result } = response;

      if (ok) {
        const { user } = result;
        setCurrentSession(user);
        dispatch(setLogin(user));
        dispatch(setRequest(false, requestType));
        if (redirect) {
          Router.push(redirect);
        }
      } else {
        const error = 'An Error has occurred logging in. Please try again.';
        const message = response.error || error;
        dispatch(setRequest(false, requestType, message));
      }
    })
    .catch((): void => {
      dispatch(setRequest(false, requestType, 'Error connecting to the server.'));
    });
};

const setLogout = () => ({
  type: actions.LOG_OUT
});

const logout = (): ((dispatch: Function, getState: () => AppState) => void) => (
  dispatch,
  getState
): void => {
  const requestType = requests.AUTHENTICATE;
  const request = getState().request[requestType] || { isPending: false };

  if (request.isPending) return;

  dispatch(setRequest(true, requestType));

  Api.delete('/account/logout')
    .then((): void => {
      dispatch(setRequest(false, requestType));
      dispatch(setLogout());
      cookie.remove('token');
      window.localStorage.setItem('logout', JSON.stringify(Date.now()));
      Router.push('/');
    })
    .catch((): void => {
      dispatch(setRequest(false, requestType, ''));
      dispatch(setLogout());
      cookie.remove('token');
      window.localStorage.setItem('logout', JSON.stringify(Date.now()));
      Router.push('/');
    });
};

const setSignup = (user) => ({
  type: actions.SIGN_UP,
  isLoggedIn: true,
  user
});

const signup = (
  form: object,
  redirect?: string
): ((dispatch: Function, getState: () => AppState) => void) => (dispatch, getState): void => {
  const requestType = requests.AUTHENTICATE;
  const request = getState().request[requestType] || { isPending: false };

  if (request.isPending) return;

  dispatch(setRequest(true, requestType));

  Api.post('/account/signup', form)
    .then((response): void => {
      const { ok, result } = response;

      if (ok) {
        const { user } = result;
        setCurrentSession(user);
        dispatch(setSignup(user));
        dispatch(setRequest(false, requestType));
        if (redirect) {
          Router.push(redirect);
        }
      } else {
        const { errors } = response;
        if (Object.keys(errors).length > 0) {
          const firstKey = Object.keys(errors)[0];
          dispatch(setRequest(false, requestType, `${firstKey} ${errors[firstKey][0]}`));
        }
      }
    })
    .catch((): void => {
      dispatch(setRequest(false, requestType, 'An error has occurred. Try again later.'));
    });
};

export const handleAuth = (
  type: 'login' | 'logout' | 'signup',
  form: object,
  redirect?: string
): ((dispatch: Function) => void) => (dispatch): void => {
  switch (type) {
    case 'login':
      dispatch(login(form, redirect));
      break;
    case 'logout':
      dispatch(logout());
      break;
    case 'signup':
      dispatch(signup(form, redirect));
      break;
    default:
      break;
  }
};

const setRefresh = (user, isLoggedIn: boolean) => ({
  type: actions.REFRESH,
  isLoggedIn,
  user
});

export const authenticate = (): ((dispatch: any, getState: () => AppState) => void) => (
  dispatch,
  getState
): void => {
  const requestType = requests.AUTHENTICATE;
  const request = getState().request[requestType] || { isPending: false };

  if (request.isPending) return;

  dispatch(setRequest(true, requestType));

  Api.fetch('/account')
    .then((response): void => {
      if (response.ok) {
        const { user } = response.result;
        setCurrentSession(user);

        dispatch(setRefresh(user, true));
        dispatch(setRequest(false, requestType));
      } else {
        cookie.remove('token');

        dispatch(setRefresh(null, false));
        dispatch(setRequest(false, requestType));
      }
    })
    .catch((): void => {
      cookie.remove('token');

      dispatch(setRefresh(null, false));
      dispatch(setRequest(false, requestType));
    });
};

export const clearSessionErrors = (): object => ({
  type: 'CLEAR_SESSION_ERRORS',
  payload: {
    message: '',
    errors: {},
    errored: false
  }
});
