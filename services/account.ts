import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import cookies from 'js-cookie';
import { ProfileUser, SessionUser, SigninPayload, SignupPayload } from '../store/session/types';
import { userLoggedIn, userLoggedOut, userUpdated } from '../store/session/reducers';
import { ApiErrorResponse } from './types';
import { SettingsForm } from '../components/Account/Profile/Settings/types';
import { Match } from '../store/hiscores/types';
import { ListResponse } from '../store/forum/types';

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
  }) as BaseQueryFn<string | FetchArgs, unknown, ApiErrorResponse, Record<string, unknown>>,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUser: builder.query<ProfileUser, string>({
      query: (username) => `/user/${username}`,
      transformResponse: (raw: { result: { user: ProfileUser } }) => raw.result.user,
      providesTags: (user) => [{ type: 'User', id: user.username }]
    }),
    getMatches: builder.query<
      ListResponse<Match>,
      { username: string; matchPage: string | string[] }
    >({
      query: ({ username, matchPage }) => ({
        url: `/user/${username}/matches`,
        method: 'GET',
        params: { matchPage }
      }),
      transformResponse: (raw: { result: ListResponse<Match> }) => raw.result
    }),
    authenticate: builder.mutation<
      { ok: boolean; result: { user?: SessionUser } },
      { type: AuthTypes; form: SigninPayload | SignupPayload | Record<string, unknown> }
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
    }),
    updateAccount: builder.mutation<{ result: { user: SessionUser } }, SettingsForm>({
      query: (form) => ({
        url: '/user',
        method: 'POST',
        body: form
      }),
      invalidatesTags: (data) => [{ type: 'User', id: data.result.user.username }],
      async onQueryStarted(_payload, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(userUpdated({ user: data.result.user }));
      }
    })
  })
});

export const {
  useAuthenticateMutation,
  useUpdateAccountMutation,
  useGetUserQuery,
  useGetMatchesQuery
} = accountApi;

export default accountApi;
