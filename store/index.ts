import {
  configureStore,
  getDefaultMiddleware,
  EnhancedStore,
  combineReducers
} from '@reduxjs/toolkit';

import request from './request/reducers';
import session from './session/reducers';
import hiscores from './hiscores/reducers';
import forum from './forum/reducers';
import game from './game/reducers';
import socket from '../services/socket';

export const reducer = combineReducers({ request, session, hiscores, forum, game });
export type AppState = ReturnType<typeof reducer>;

const store = (preloadedState: object = {}): EnhancedStore =>
  configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), socket(process.env.SOCKET_URL)],
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState
  });

export default store;
