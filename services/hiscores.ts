import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Match } from './types';

const hiscoresApi = createApi({
  reducerPath: 'hiscores',
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
  }),
  tagTypes: [],
  endpoints: (builder) => ({
    getQuoteHiscores: builder.query<Match[], number>({
      query: (id) => `/snippet/${id}/matches/`,
      transformResponse: (raw: { result: { matches: Match[] } }) => raw.result.matches
    }),
    getHiscores: builder.query<Match[], string>({
      query: (query) => `/matches?query=${query.toLowerCase()}`,
      transformResponse: (raw: { result: { matches: Match[] } }) => raw.result.matches
    }),
    getUserHiscores: builder.query<any, { query: string; page?: string; type?: string }>({
      query: ({ query, page, type }) => ({
        url: `/leaderboards/${query?.toLowerCase()}`,
        method: 'GET',
        params: { page, type }
      }),
      transformResponse: (raw: { result }) => raw.result
    })
  })
});

export const { useLazyGetQuoteHiscoresQuery, useGetHiscoresQuery, useGetUserHiscoresQuery } =
  hiscoresApi;

export default hiscoresApi;
