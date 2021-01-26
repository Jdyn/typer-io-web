import React, { useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '../../Shared/Paper';
import formatTime from '../../../util/formatTime';
import { AppState } from '../../../store';
import { fetchPosts } from '../../../store/forum/actions';
import styles from './index.module.css';
import Loader from '../../Shared/Loader';
import MiniListPost from './Post';

interface Props {
  children?: React.ReactNode;
}

const RecentPosts = (): JSX.Element => {
  const dispatch = useDispatch();

  const posts = useSelector(
    (state: AppState) => state.forum.feed.recent.posts || []
  );
  const recentPostsRequest = useSelector(
    (state: AppState) => state.request.FETCH_POSTS_BY_RECENT
  );
  useEffect(() => {
    if (!recentPostsRequest) {
      dispatch(fetchPosts('RECENT'));
    }
  }, [dispatch, recentPostsRequest]);

  return (
    <section className={styles.root}>
      <Paper title="Recent Posts">
        {recentPostsRequest?.success && (
          <div className={styles.container}>
            {posts.map((post) => (
              <MiniListPost post={post} />
            ))}
          </div>
        )}
        {recentPostsRequest?.isPending && (
          <div className={styles.loader}>
            <Loader width="48px" height="48px" />
          </div>
        )}
        {recentPostsRequest?.errored && (
          <div className={styles.loader}>
            <span>Failed to load recent posts.</span>
          </div>
        )}
      </Paper>
    </section>
  );
};

export default RecentPosts;
