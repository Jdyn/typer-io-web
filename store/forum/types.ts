import { User } from "../session/types";

export const forumRequests: {
  FETCH_POSTS_BY_RECENT: 'FETCH_POSTS_BY_RECENT';
  FETCH_POSTS_BY_FEED: 'FETCH_POSTS_BY_FEED';
  FETCH_POST_BY_ID: 'FETCH_POST_BY_ID';
  CREATE_NEW_POST: 'CREATE_NEW_POST';
} = {
  FETCH_POSTS_BY_RECENT: 'FETCH_POSTS_BY_RECENT',
  FETCH_POSTS_BY_FEED: 'FETCH_POSTS_BY_FEED',
  FETCH_POST_BY_ID: 'FETCH_POST_BY_ID',
  CREATE_NEW_POST: 'CREATE_NEW_POST'
};

export type PostQueryTypes = 'recent' | 'feed';

export interface ForumState {
  post: Post;
  feed: ListResponse<MiniPost>;
  recent: ListResponse<MiniPost>;
}

export interface MiniPost {
  body: string;
  commentCount: number;
  createdAt: string;
  downvotes: number;
  id: number;
  title: string;
  updatedAt: string;
  upvotes: number;
  user: { isAdmin: boolean; insertedAt: string; username: string };
  visitCount: string;
}

export interface Post {
  body: string;
  commentCount: number;
  createdAt: string;
  downvotes: number;
  id: number;
  title: string;
  updatedAt: string;
  upvotes: number;
  user: { isAdmin: boolean; insertedAt: string; username: string };
  visitCount: string;
  comments: Comment[];
}

export interface Comment {
  body: string;
  comments: Comment[];
  createdAt: string;
  user: User;
  depth: number;
  id: number;
  replyable: boolean;
}

export interface ListResponse<T> {
  page: number;
  total: number;
  totalPages: number;
  data: T[];
}
