import React, { useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import styles from './index.module.css';
import Banner from '../../Shared/Banner';
import formatTime from '../../../util/formatTime';
import { AppState } from '../../../store';
import { fetchPosts } from '../../../store/forum/actions';

interface Props {
  children?: React.ReactNode;
}

const RecentPosts = (): JSX.Element => {
  const dispatch = useDispatch();

  const posts = useSelector((state: AppState) => state.forum.feed.recent.posts || []);
  useEffect(() => {
    dispatch(fetchPosts('RECENT'));
  }, [dispatch]);

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
                <Link href={`/forum/post/${post.id}`}>
                  <h1 className={styles.title}>{post.title}</h1>
                </Link>
                <span>
                  {formatTime(post.created_at)} by {post.user.username}
                </span>
                <p>{post.body}</p>
                <Link href={`/forum/post/${post.id}`}>
                  <h3>
                    {post.comment_count} comment{post.comment_count === 1 ? '' : 's'}
                  </h3>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentPosts;
