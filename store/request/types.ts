export interface Request {
  type: string;
  requestType: string;
  success?: boolean;
  isPending: boolean;
  errored: boolean;
  error: string;
}

export const emptyRequest: Request = {
  type: '',
  requestType: '',
  success: false,
  isPending: false,
  errored: false,
  error: null
};

export interface RequestState {
  [requestType: string]: Request;
}

export type RequestTypes = Request;