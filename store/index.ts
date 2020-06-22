import {
  configureStore,
  getDefaultMiddleware,
  EnhancedStore,
  combineReducers
} from '@reduxjs/toolkit';

import request from './request/reducers';
import session from './session/reducers';
import hiscores from './hiscores/reducers';

export const reducer = combineReducers({ request, session, hiscores });
export type AppState = ReturnType<typeof reducer>;

const store = (preloadedState: object = {}): EnhancedStore =>
  configureStore({
    reducer,
    middleware: [...getDefaultMiddleware()],
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState
  });

export default store;
