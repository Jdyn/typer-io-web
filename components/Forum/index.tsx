import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import styles from './index.module.css';
import Banner from '../Shared/Banner';
import { fetchPosts } from '../../store/forum/actions';
import { AppState } from '../../store';
import formatTime from '../../util/formatTime';
import Button from '../Shared/Button';

const Forum = (): JSX.Element => {
  const dispatch = useDispatch();
  const posts = useSelector(
    (state: AppState) => state.forum.feed.page?.posts || []
  );
  useEffect(() => {
    dispatch(fetchPosts('PAGE'));
  }, [dispatch]);

  return (
    <div className={styles.root}>
      <div className={styles.create}>
        <Link href="/forum/post">
          <Button padding="10px">Create Post</Button>
        </Link>
      </div>
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
                  <Link prefetch={false} href={`/forum/post/${post.id}`}>
                    <a className={styles.title}>{post.title}</a>
                  </Link>
                  <span>
                    Posted {formatTime(post.createdAt)} by {post.user.username}{' '}
                    {post.user.isAdmin && (
                      <span className={styles.admin}>Creator</span>
                    )}
                  </span>
                  {post.commentCount > 0 && (
                    <span>Last comment {formatTime(post.updatedAt)}</span>
                  )}
                  <Link prefetch={false} href={`/forum/post/${post.id}`}>
                    <a className={styles.comment}>
                      {post.commentCount} comment
                      {post.commentCount === 1 ? '' : 's'}
                    </a>
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
