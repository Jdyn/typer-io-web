import Link from 'next/link';
import React from 'react';
import formatTime from '../../../util/formatTime';
import styles from './index.module.css';

const MiniListPost = (props) => {
  const { post } = props;

  return (
    <div className={styles.post} key={post.id}>
      <div className={styles.content}>
        <Link
          prefetch={false}
          href={`/forum/post/${post.id}/${post.title.split(' ').join('_')}`}
        >
          <a className={styles.title}>{post.title}</a>
        </Link>
        <span>
          {formatTime(post.createdAt)} by{' '}
          <Link href={`/u/${post.user.username}`}>
            <a>{post.user.username}</a>
          </Link>
          {post.user.isAdmin && <span className={styles.admin}>Creator</span>}
        </span>
        <p>{post.body}</p>
        <Link
          prefetch={false}
          href={`/forum/post/${post.id}/${post.title.split(' ').join('_')}`}
        >
          <a className={styles.comment}>
            {post.commentCount}{' '}
            {post.commentCount === 1 ? 'comment' : 'comments'}
          </a>
        </Link>
      </div>
    </div>
  );
};

export default MiniListPost;
