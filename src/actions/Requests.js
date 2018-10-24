import * as actionTypes from '../constants/ActionTypes';

export function setRequestInProgress(inProgress, requestType) {
  return {
    type: actionTypes.SET_REQUEST_IN_PROGRESS,
    requestType,
    inProgress
  };
}