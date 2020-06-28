import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import styles from './index.module.css';
import Banner from '../Shared/Banner';
import { fetchPosts } from '../../store/forum/actions';
import { AppState } from '../../store';
import formatTime from '../../util/formatTime';

const Forum = (_props): JSX.Element => {
  const dispatch = useDispatch();
  const posts = useSelector((state: AppState) => state.forum.feed.page?.posts || []);
  useEffect(() => {
    dispatch(fetchPosts('PAGE'));
  }, [dispatch]);

  return (
    <div className={styles.root}>
      <div className={styles.feed}>
        <Banner>
          <h1>Forum</h1>
        </Banner>
        <div className={styles.feedContainer}>
          <div className={styles.feedWrapper}>
            {posts.map((post) => (
              <li className={styles.feedItem} key={post.id}>
                <div className={styles.portrait} />
                <div className={styles.feedContent}>
                  <Link href={`/forum/post/${post.id}`}>
                    <h1 className={styles.title}>{post.title}</h1>
                  </Link>
                  <span>
                    {formatTime(post.createdAt)} by {post.user.username}
                  </span>
                  <Link prefetch={false} href={`/forum/post/${post.id}`}>
                    <span className={styles.comment}>
                      {post.commentCount} comment{post.commentCount === 1 ? '' : 's'}
                    </span>
                  </Link>
                </div>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;
