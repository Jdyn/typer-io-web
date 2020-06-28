interface RequestActions {
  SET_REQUEST: 'request/SET_REQUEST';
}

export const requestActions: RequestActions = {
  SET_REQUEST: 'request/SET_REQUEST'
};

export interface Request {
  type: typeof requestActions.SET_REQUEST;
  requestType: string;
  success?: boolean;
  isPending: boolean;
  errored: boolean;
  error: string;
}

export const emptyRequest: Request = {
  type: 'request/SET_REQUEST',
  requestType: '',
  success: false,
  isPending: false,
  errored: false,
  error: null
};

export interface RequestState {
  [requestType: string]: Request;
}

export type RequestActionTypes = Request;
