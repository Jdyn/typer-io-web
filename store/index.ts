import {
  configureStore,
  getDefaultMiddleware,
  EnhancedStore,
  combineReducers
} from '@reduxjs/toolkit';

import { HYDRATE, createWrapper } from 'next-redux-wrapper';

import request from './request/reducers';
import session from './session/reducers';
import hiscores from './hiscores/reducers';
import forum from './forum/reducers';
import game from './game/reducers';
import socket from '../services/socket';

export const stateReducer = combineReducers({
  request,
  session,
  hiscores,
  forum,
  game
});

const appReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload
      };
    default:
      return stateReducer(state, action);
  }
};

const store = (preloadedState = {}): EnhancedStore =>
  configureStore({
    reducer: appReducer,
    middleware: [...getDefaultMiddleware(), socket(process.env.SOCKET_URL)],
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState
  });

export type AppState = ReturnType<typeof stateReducer>;

export const wrapper = createWrapper(store);
