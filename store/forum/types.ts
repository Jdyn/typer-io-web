export const forumRequests: {
  FETCH_POSTS_BY_RECENT: 'FETCH_POSTS_BY_RECENT';
  FETCH_POSTS_BY_PAGE: 'FETCH_POSTS_BY_PAGE';
  FETCH_POST_BY_ID: 'FETCH_POST_BY_ID';
  CREATE_NEW_POST: 'CREATE_NEW_POST';
} = {
  FETCH_POSTS_BY_RECENT: 'FETCH_POSTS_BY_RECENT',
  FETCH_POSTS_BY_PAGE: 'FETCH_POSTS_BY_PAGE',
  FETCH_POST_BY_ID: 'FETCH_POST_BY_ID',
  CREATE_NEW_POST: 'CREATE_NEW_POST'
};

export interface MiniPost {
  body: string;
  commentCount: number;
  createdAt: string;
  downvotes: number;
  id: number;
  title: string;
  updatedAt: string;
  upvotes: number;
  user: { isAdmin: boolean; joined_at: string; username: string };
  visitCount: string;
}
