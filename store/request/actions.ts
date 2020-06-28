import { Request, requestActions } from './types';

export const setRequest = (isPending: boolean, requestType: string, error?: string): Request => ({
  type: requestActions.SET_REQUEST,
  requestType,
  isPending,
  errored: !!error,
  error
});
