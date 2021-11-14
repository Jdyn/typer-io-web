import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ListResponse, Post } from './types';

const forumApi = createApi({
  reducerPath: 'forum',
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
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getPost: builder.query<Post, string>({
      query: (id) => `/forum/posts/${id}`,
      transformResponse: (raw: { result: { post: Post } }) => raw.result.post,
      providesTags: (result) => [{ type: 'Post', id: result?.id }]
    }),
    getPosts: builder.query<ListResponse<Post>, { page?: string; query?: string }>({
      query: (params?) => ({
        url: `/forum/posts`,
        params
      }),
      transformResponse: (raw: { result: ListResponse<Post> }) => raw.result,
      providesTags: ['Post']
    }),
    addPost: builder.mutation<Post, { title: string; body: string }>({
      query: (newPost) => ({
        url: `/forum/posts`,
        method: 'POST',
        body: newPost
      }),
      transformResponse: (raw: { result: { post: Post } }) => raw.result.post,
      invalidatesTags: ['Post']
    }),
    addPostComment: builder.mutation<
      void,
      { comment: { body: string; parentId: number }; postId: string }
    >({
      query: (payload) => ({
        url: `/forum/posts/${payload.postId}/comments`,
        method: 'POST',
        body: payload.comment
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Post', id: arg.postId }]
    })
  })
});

export const { useGetPostQuery, useGetPostsQuery, useAddPostMutation, useAddPostCommentMutation } =
  forumApi;

export default forumApi;
