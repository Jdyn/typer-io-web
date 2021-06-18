import Router from 'next/router';
import { Dispatch } from 'redux';
import cookies from 'js-cookie';
import Api from '../../services/api';
import { setRequest } from '../request/actions';
import { AppState } from '..';
import { requests } from './types';
import {
  userLoggedIn,
  userSignedUp,
  userLoggedOut,
  userRefreshed,
  userUpdated
} from './reducers';

const setCurrentSession = (user): void => {
  if (user.token) {
    const jsonToken = user.token;
    localStorage.setItem('token', jsonToken);
    cookies.set('token', user.token);
    localStorage.setItem('username', user.username);
  }
};

const login = (
  form,
  redirect?: string
): ((dispatch, getState: () => AppState) => void) => (
  dispatch,
  getState
): void => {
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
      dispatch(
        setRequest(false, requestType, 'Error connecting to the server.')
      );
    });
};

const logout = (): ((dispatch, getState: () => AppState) => void) => (
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
      localStorage.removeItem('token');
      cookies.remove('token');
      window.localStorage.setItem('logout', JSON.stringify(Date.now()));
      window.localStorage.removeItem('username');
      Router.push('/');
    })
    .catch((): void => {
      dispatch(setRequest(false, requestType, ''));
      dispatch(userLoggedOut({}));
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      cookies.remove('token');
      window.localStorage.setItem('logout', JSON.stringify(Date.now()));
      Router.push('/');
    });
};

const signup = (
  form,
  redirect?: string
): ((dispatch, getState: () => AppState) => void) => (
  dispatch,
  getState
): void => {
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
          dispatch(
            setRequest(false, requestType, `${firstKey} ${errors[firstKey][0]}`)
          );
        }
      }
    })
    .catch((): void => {
      dispatch(
        setRequest(
          false,
          requestType,
          'An error has occurred. Try again later.'
        )
      );
    });
};

export const handleAuth = (
  type: 'login' | 'logout' | 'signup',
  form: Record<string, unknown>,
  redirect?: string
): ((dispatch) => void) => (dispatch): void => {
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

export const authenticate = (): ((
  dispatch: any,
  getState: () => AppState
) => void) => (dispatch, getState): void => {
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
        localStorage.removeItem('token');
        cookies.remove('token');
        dispatch(userRefreshed({ user: null, isLoggedIn: false }));
        dispatch(setRequest(false, requestType));
      }
    })
    .catch((): void => {});
};

export const updateUser = (payload) => async (
  dispatch: Dispatch,
  getState: () => AppState
): Promise<void> => {
  const requestType = requests.UPDATE_USER;
  const request = getState().request[requestType] || { isPending: false };

  if (request.isPending) return;

  dispatch(setRequest(true, requestType));

  const response = await Api.post('/user', payload);

  if (response.ok) {
    dispatch(userUpdated({ user: response.result.user }));
    dispatch(setRequest(false, requestType));
  } else {
    const error = response?.errors
      ? `${Object.keys(response?.errors)[0] || ''} ${
          response?.errors[Object.keys(response?.errors)[0]][0]
        }`
      : 'Failed to save.';

    dispatch(setRequest(false, requestType, error));
  }
};

export const fetchPasswordReset = (email: string) => async (
  dispatch: Dispatch,
  getState: () => AppState
): Promise<void> => {
  const requestType = requests.FETCH_ACCOUNT_PASSWORD_RESET;
  const request = getState().request[requestType] || { isPending: false };

  if (request.isPending) return;

  dispatch(setRequest(true, requestType));

  await Api.post('/password/reset', { email });

  dispatch(setRequest(false, requestType));
};

export const fetchPasswordUpdate = (
  password: string,
  resetToken: string
) => async (dispatch: Dispatch, getState: () => AppState): Promise<void> => {
  const requestType = requests.FETCH_ACCOUNT_PASSWORD_UPDATE;
  const request = getState().request[requestType] || { isPending: false };

  if (request.isPending) return;

  dispatch(setRequest(true, requestType));

  const response = await Api.patch('/password/update', {
    password,
    resetToken
  });

  if (response.ok) {
    dispatch(setRequest(false, requestType));
  } else {
    dispatch(setRequest(false, requestType, 'Failed to reset password.'));
  }
};
