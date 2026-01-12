import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import cookies from 'js-cookie';
import {
  ProfileUser,
  SessionUser,
  SigninPayload,
  SignupPayload,
  User
} from '../store/session/types';
import { userRefreshed, userLoggedOut, userUpdated } from '../store/session/reducers';
import { SettingsForm } from '../components/Account/Profile/Settings/types';
import { ListResponse, ApiErrorResponse, Match } from './types';

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
      providesTags: (user) => [{ type: 'User', id: user?.username }]
    }),
    getMatches: builder.query<
      ListResponse<Match>,
      { userId: number; matchPage: string | string[] }
    >({
      query: ({ userId, matchPage }) => ({
        url: `/user/${userId}/matches`,
        method: 'GET',
        params: { matchPage }
      }),
      transformResponse: (raw: { result: ListResponse<Match> }) => raw.result
    }),
    getUserGoal: builder.query<{ result: { goal: number } }, null>({
      query: () => ({
        url: `/goal`,
        method: 'GET'
      }),
      transformResponse: (raw: any) => raw.result.progress
    }),
    searchUser: builder.query<ListResponse<User>, { username: string; page?: string }>({
      query: ({ username, page }) => ({
        url: `/users/search`,
        method: 'GET',
        params: { user: username, page }
      }),
      transformResponse: (raw: { result: ListResponse<User> }) => raw.result
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
              dispatch(userRefreshed({ isLoggedIn: true, user: data.result.user }));
              break;
            case 'signout':
              setCurrentSession(null, 'delete');
              dispatch(userLoggedOut());
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
        dispatch(userUpdated(data.result.user));
      }
    }),
    sendPasswordResetEmail: builder.query<{ ok: boolean }, string>({
      query: (email) => ({
        url: `/password/reset`,
        method: 'POST',
        body: { email }
      })
    }),
    resetPassword: builder.query<{ ok: boolean }, { password: string; resetToken: string }>({
      query: (body) => ({
        url: `/password/update`,
        method: 'PATCH',
        body
      })
    }),
    sendValidateEmail: builder.query<{ ok: boolean }, null>({
      query: () => ({
        url: `/validate_email`,
        method: 'GET'
      })
    }),
    validateEmail: builder.query<{ ok: boolean }, string>({
      query: (token) => ({
        url: `/validate_email/${token}`,
        method: 'POST'
      })
    }),
    uploadAvatar: builder.mutation<{ ok: boolean; result: { uploadUrl: string } }, null>({
      query: () => ({
        url: '/account/avatar',
        method: 'POST'
      })
    }),
    deleteAvatar: builder.mutation<void, void>({
      query: () => ({
        url: '/account/avatar',
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'User' }],
      async onQueryStarted(_payload, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Update session user to remove avatar URL
          dispatch(userUpdated({ avatarUrl: null }));
        } catch (error) {
          // Error handled by component
        }
      }
    })
  })
});

export const {
  useAuthenticateMutation,
  useUpdateAccountMutation,
  useSearchUserQuery,
  useGetUserQuery,
  useGetMatchesQuery,
  useLazySendValidateEmailQuery,
  useValidateEmailQuery,
  useLazySendPasswordResetEmailQuery,
  useLazyResetPasswordQuery,
  useGetUserGoalQuery,
  useUploadAvatarMutation,
  useDeleteAvatarMutation
} = accountApi;

export default accountApi;
