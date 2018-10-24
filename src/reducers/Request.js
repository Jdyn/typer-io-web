import * as actionTypes from '../constants/ActionTypes';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_REQUEST_IN_PROGRESS:
      return setRequestInProgress(state, action);
  }
  return state;
}

function setRequestInProgress(state, action) {
  const { inProgress, requestType } = action;
  const requestObject = {};
  requestObject[requestType] = inProgress;
  return Object.assign({}, state, requestObject);
}