import { User } from "../session/types";

export type PostQueryTypes = 'recent' | 'feed';

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
}
