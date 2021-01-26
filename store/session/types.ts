export interface SessionRequests {
  AUTHENTICATE: 'AUTHENTICATE';
  UPDATE_USER: 'UPDATE_USER';
}

export const requests: SessionRequests = {
  AUTHENTICATE: 'AUTHENTICATE',
  UPDATE_USER: 'UPDATE_USER'
};

interface SessionActions {
  LOG_IN: 'LOG_IN';
  SIGN_UP: 'SIGN_UP';
  LOG_OUT: 'LOG_OUT';
  REFRESH: 'session/REFRESH';
}

export const actions: SessionActions = {
  LOG_IN: 'LOG_IN',
  SIGN_UP: 'SIGN_UP',
  LOG_OUT: 'LOG_OUT',
  REFRESH: 'session/REFRESH'
};
