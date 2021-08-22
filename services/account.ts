import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import cookies from 'js-cookie';
import { SessionUser, SigninPayload, SignupPayload } from '../store/session/types';
import { userLoggedIn, userLoggedOut } from '../store/session/reducers';
import { ApiErrorResponse } from './types';

export type AuthTypes = 'signup' | 'signin' | 'signout';

const setCurrentSession = (user: SessionUser, key?: 'delete'): void => {
  if (user) {
    const jsonToken = user.token;
    localStorage.setItem('token', jsonToken);
    cookies.set('token', user.token);
    localStorage.setItem('username', user.username);
  }

  if (key) {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    cookies.remove('token');
    window.localStorage.setItem('logout', JSON.stringify(Date.now()));
  }
};

const accountApi = createApi({
  reducerPath: 'account',
  keepUnusedDataFor: 300,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token') || '';
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    }
  }) as BaseQueryFn<string | FetchArgs, unknown, ApiErrorResponse, {}>,
  tagTypes: [],
  endpoints: (builder) => ({
    authenticate: builder.mutation<
      any,
      { type: AuthTypes; form: SigninPayload | SignupPayload | {} }
    >({
      query: (payload) => ({
        url: `/${payload.type}`,
        method: payload.type === 'signout' ? 'DELETE' : 'POST',
        body: payload.form
      }),
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          switch (payload.type) {
            case 'signup':
            case 'signin':
              setCurrentSession(data.result.user);
              dispatch(userLoggedIn({ user: data.result.user }));
              break;
            case 'signout':
              setCurrentSession(null, 'delete');
              dispatch(userLoggedOut({}));
              break;
            default:
              break;
          }
        } catch (error) {
          // Hmm?
        }
      }
    })
  })
});

export const { useAuthenticateMutation } = accountApi;

export default accountApi;
