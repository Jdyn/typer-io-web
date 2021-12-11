import { configureStore, combineReducers, ThunkAction, Action } from '@reduxjs/toolkit';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';

import request from './request/reducers';
import session from './session/reducers';
import game from './game/reducers';
import socket from '../services/socket';

import forumApi from '../services/forum';
import accountApi from '../services/account';
import hiscoresApi from '../services/hiscores';

export const stateReducer = combineReducers({
  request,
  session,
  game,
  [forumApi.reducerPath]: forumApi.reducer,
  [accountApi.reducerPath]: accountApi.reducer,
  [hiscoresApi.reducerPath]: hiscoresApi.reducer
});

const appReducer = (state, action): ReturnType<typeof stateReducer> => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    default:
      return stateReducer(state, action);
  }
};

const makeStore = () =>
  configureStore({
    reducer: appReducer,
    middleware: (defaultMiddleware) =>
      defaultMiddleware()
        .concat(socket(process.env.SOCKET_URL))
        .concat(forumApi.middleware)
        .concat(accountApi.middleware)
        .concat(hiscoresApi.middleware),
    devTools: process.env.NODE_ENV !== 'production'
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<typeof stateReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export type GetState = () => AppState;

export const wrapper = createWrapper<AppStore>(makeStore);
