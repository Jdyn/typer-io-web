import { configureStore, combineReducers, ThunkAction, Action } from '@reduxjs/toolkit';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';

import request from './request/reducers';
import session from './session/reducers';
import hiscores from './hiscores/reducers';
import game from './game/reducers';
import socket from '../services/socket';

import forumApi from '../services/forum';

export const stateReducer = combineReducers({
  request,
  session,
  hiscores,
  game,
  [forumApi.reducerPath]: forumApi.reducer
});

const appReducer = (state, action) => {
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
      defaultMiddleware().concat(socket(process.env.SOCKET_URL)).concat(forumApi.middleware),
    devTools: process.env.NODE_ENV !== 'production'
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = ReturnType<AppStore['dispatch']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export type GetState = () => AppState;

export const wrapper = createWrapper<AppStore>(makeStore);
