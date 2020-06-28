import { RequestState, RequestActionTypes, requestActions } from './types';

const initialState = {};

const setRequest = (state: RequestState, action: RequestActionTypes): RequestState => {
  const { isPending, requestType, error, errored } = action;
  const requestObject = {};

  requestObject[requestType] = {
    isPending,
    success: !error && !isPending,
    ...(!error ? { errored: false, error: null } : { errored, error })
  };

  return { ...state, ...requestObject };
};

const reducer = (state: RequestState = initialState, action: RequestActionTypes): RequestState => {
  switch (action.type) {
    case requestActions.SET_REQUEST:
      return setRequest(state, action);
    default:
      return state;
  }
};

export default reducer;
