import React, { useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../../Shared/Banner';
import formatTime from '../../../util/formatTime';
import { AppState } from '../../../store';
import { fetchPosts } from '../../../store/forum/actions';
import styles from './index.module.css';

interface Props {
  children?: React.ReactNode;
}

const RecentPosts = (): JSX.Element => {
  const dispatch = useDispatch();

  const posts = useSelector((state: AppState) => state.forum.feed.recent.posts || []);
  const recentPostsRequest = useSelector((state: AppState) => state.request.FETCH_POSTS_BY_RECENT);
  useEffect(() => {
    if (!recentPostsRequest) {
      dispatch(fetchPosts('RECENT'));
    }
  }, [dispatch, recentPostsRequest]);

  return (
    <section className={styles.root}>
      <Banner>
        <h1>Recent Posts</h1>
      </Banner>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {posts.map((post) => (
            <div className={styles.post} key={post.id}>
              {/* <div className={styles.portrait} /> */}
              <div className={styles.content}>
                <Link prefetch={false} href={`/forum/post/${post.id}`}>
                  <a className={styles.title}>{post.title}</a>
                </Link>
                <span>
                  {formatTime(post.createdAt)} by {post.user.username}
                </span>
                <p>{post.body}</p>
                <Link prefetch={false} href={`/forum/post/${post.id}`}>
                  <a className={styles.comment}>
                    {post.commentCount} {post.commentCount === 1 ? 'comment' : 'comments'}
                  </a>
                </Link>
              </div>
            </div>
          ))}
          {posts.length === 0 && <div className={styles.empty}>No Recent Posts.</div>}
        </div>
      </div>
    </section>
  );
};

export default RecentPosts;
