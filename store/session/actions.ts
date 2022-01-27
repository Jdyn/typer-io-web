import cookies from 'js-cookie';
import { AppState } from '..';
import Api from '../../services/api';
import { setRequest } from '../request/actions';
import { requests } from './types';
import { userRefreshed } from './reducers';

export const setCurrentSession = (user): void => {
  if (user.token) {
    const jsonToken = user.token;
    localStorage.setItem('token', jsonToken);
    cookies.set('token', user.token);
    localStorage.setItem('username', user.username);
  }
};

export const authenticate =
  (): ((dispatch, getState: () => AppState) => void) =>
  (dispatch, getState): void => {
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
