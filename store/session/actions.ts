import Router from 'next/router';
import Api from '../../services/api';
import { setRequest } from '../request/actions';
import { AppState } from '..';
import { requests } from './types';
import { userLoggedIn, userSignedUp, userLoggedOut, userRefreshed } from './reducers';

const setCurrentSession = (user): void => {
  if (user.token) {
    const jsonToken = user.token;
    localStorage.setItem('token', jsonToken);
    localStorage.setItem('username', user.username);
  }
};

const login = (
  form: object,
  redirect?: string
): ((dispatch: Function, getState: () => AppState) => void) => (dispatch, getState): void => {
  const requestType = requests.AUTHENTICATE;
  const request = getState().request[requestType] || { isPending: false };

  if (request.isPending) return;

  dispatch(setRequest(true, requestType));

  Api.post('/signin', form)
    .then((response): void => {
      const { ok, result } = response;

      if (ok) {
        const { user } = result;
        setCurrentSession(user);
        dispatch(userLoggedIn({ user }));
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

const logout = (): ((dispatch: Function, getState: () => AppState) => void) => (
  dispatch,
  getState
): void => {
  const requestType = requests.AUTHENTICATE;
  const request = getState().request[requestType] || { isPending: false };

  if (request.isPending) return;

  dispatch(setRequest(true, requestType));

  Api.delete('/logout')
    .then((): void => {
      dispatch(setRequest(false, requestType));
      dispatch(userLoggedOut({}));
      localStorage.remove('token');
      window.localStorage.setItem('logout', JSON.stringify(Date.now()));
      Router.push('/');
    })
    .catch((): void => {
      dispatch(setRequest(false, requestType, ''));
      dispatch(userLoggedOut({}));
      localStorage.remove('token');
      window.localStorage.setItem('logout', JSON.stringify(Date.now()));
      Router.push('/');
    });
};

const signup = (
  form: object,
  redirect?: string
): ((dispatch: Function, getState: () => AppState) => void) => (dispatch, getState): void => {
  const requestType = requests.AUTHENTICATE;
  const request = getState().request[requestType] || { isPending: false };

  if (request.isPending) return;

  dispatch(setRequest(true, requestType));

  Api.post('/signup', form)
    .then((response): void => {
      const { ok, result } = response;

      if (ok) {
        const { user } = result;
        setCurrentSession(user);
        dispatch(userSignedUp({ user }));
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

export const authenticate = (): ((dispatch: any, getState: () => AppState) => void) => (
  dispatch,
  getState
): void => {
  const requestType = requests.AUTHENTICATE;
  const request = getState().request[requestType] || { isPending: false };

  if (request.isPending) return;

  dispatch(setRequest(true, requestType));

  Api.fetch('/refresh')
    .then((response): void => {
      if (response.ok) {
        const { user } = response.result;
        setCurrentSession(user);
        dispatch(userRefreshed({ user, isLoggedIn: true }));
        dispatch(setRequest(false, requestType));
      } else if (response.ok !== null && response.ok === false) {
        localStorage.remove('token');
        dispatch(userRefreshed({ user: null, isLoggedIn: false }));
        dispatch(setRequest(false, requestType));
      }
    })
    .catch((): void => {});
};

export const clearSessionErrors = (): object => ({
  type: 'CLEAR_SESSION_ERRORS',
  payload: {
    message: '',
    errors: {},
    errored: false
  }
});
