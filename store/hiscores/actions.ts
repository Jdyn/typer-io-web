import { Dispatch } from '@reduxjs/toolkit';
import Api from '../../services/api';
import { HiscoreQueryTypes, hiscoresRequests } from './types';
import { emptyRequest } from '../request/types';
import { setRequest } from '../request/actions';
import { AppState } from '..';
import { hiscoresFetched, userHiscoresFetched } from './reducers';
import snakeToCamel from '../../util/snakeToCamel';

export const fetchHiscores = (query: HiscoreQueryTypes) => async (
  dispatch: Dispatch,
  getState: () => AppState
): Promise<void> => {
  const requestType = hiscoresRequests[`FETCH_HISCORES_${query}`];
  const request = getState().request[requestType] ?? emptyRequest;

  if (request.isPending) return;

  dispatch(setRequest(true, requestType));

  const response = await Api.fetch(`/matches?query=${query.toLowerCase()}`);

  if (response.ok) {
    const payload = {
      key: query.toLowerCase(),
      matches: [...response.result.matches]
    };

    dispatch(hiscoresFetched(payload));
    dispatch(setRequest(false, requestType));
  }
};

export const fetchUserHiscores = (query, page) => async (
  dispatch,
  getState
): Promise<void> => {
  const requestType = hiscoresRequests[`FETCH_USER_HISCORES_${query}`];
  const request = getState().request[requestType] ?? emptyRequest;

  if (request.isPending) return;

  dispatch(setRequest(true, requestType));

  const response = await Api.fetch(
    `/leaderboards/${query.toLowerCase()}?page=${page}`
  );

  const key = snakeToCamel(query.toLowerCase());

  if (response.ok) {
    const payload = {
      key,
      [key]: {
        ...response.result
      }
    };

    dispatch(userHiscoresFetched(payload));
    dispatch(setRequest(false, requestType));
  }
};
