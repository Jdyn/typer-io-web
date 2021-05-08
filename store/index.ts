/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-underscore-dangle */
import { useMemo } from 'react';
import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
  ThunkAction,
  Action,
  DeepPartial
} from '@reduxjs/toolkit';

import request from './request/reducers';
import session from './session/reducers';
import hiscores from './hiscores/reducers';
import forum from './forum/reducers';
import game from './game/reducers';
import socket from '../services/socket';

let store;

export const reducer = combineReducers({
  request,
  session,
  hiscores,
  forum,
  game
});

const initStore = (preloadedState: Record<string, unknown> = {}) =>
  configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), socket(process.env.SOCKET_URL)],
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState
  });

export type AppState = ReturnType<typeof reducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const initializeStore = (preloadedState: DeepPartial<AppState> = {}) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState: DeepPartial<AppState> = {}) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
