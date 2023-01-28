import { User } from '../store/session/types';

export interface ApiResponse {
  ok: boolean;
  result: Record<string, any>;
}

export interface ApiErrorResponse {
  status: number;
  data: {
    ok: boolean;
    result: Record<string, any>;
    error?: string;
    errors?: Record<string, any>[];
  };
}

export type PostQueryTypes = 'recent' | 'feed';

export interface Match {
  accuracy: number;
  created_at: string;
  errors: number;
  formattedTime: string;
  id: number;
  nickname: string;
  placed: number;
  snippetTitle: string;
  time: number;
  difficulty: string;
  user: { id: number; isAdmin: boolean; username: string };
  wpm: number;
}

export type HiscoreQueryTypes = 'DAY' | 'WEEK' | 'MONTH' | 'USER' | 'ALL';

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
  user: { isAdmin: boolean; insertedAt: string; username: string; id?: number };
  visitCount: string;
  comments?: Comment[];
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
  data: T[];
  page: number;
  count: number;
  totalPages: number;
  pageSize?: number;
}
