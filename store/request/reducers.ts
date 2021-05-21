import { RequestState, RequestTypes } from './types';

const initialState = {};

const setRequest = (
  state: RequestState,
  action: RequestTypes
): RequestState => {
  const { isPending, requestType, error, errored, success } = action;

  const requestObject = {};

  requestObject[requestType] = {
    isPending,
    success,
    ...(!error ? { errored: false, error: null } : { errored, error })
  };

  return { ...state, ...requestObject };
};

const reducer = (
  state: RequestState = initialState,
  action: RequestTypes
): RequestState => {
  if (action.requestType) {
    return setRequest(state, action);
  }

  return state;
};

export default reducer;