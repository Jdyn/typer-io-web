import Link from 'next/link';
import React from 'react';
import { Post } from '../../../services/types';
import formatTime from '../../../util/formatTime';
import styles from './index.module.css';

interface Props {
  post: Post;
}

const MiniListPost = (props: Props): JSX.Element => {
  const { post } = props;

  return (
    <div className={styles.post} key={post.id}>
      <div className={styles.content}>
        <Link
          prefetch={false}
          className={styles.title}
          href={`/forum/post/${post.id}/${encodeURIComponent(post.title.split(' ').join('-'))}`}
        >
          {post.title}
        </Link>
        <span>
          {`${formatTime(post.createdAt)} by `}
          <Link prefetch={false} href={`/u/${post.user.username}`}>
            {post.user.username}
          </Link>
          {post.user.isAdmin && <span className={styles.admin}>Creator</span>}
        </span>
        <p>{post.body}</p>
        {post.commentCount > 0 && (
          <span className={styles.updatedAt}>Last comment {formatTime(post.updatedAt)}</span>
        )}
        <Link
          prefetch={false}
          className={styles.comment}
          href={`/forum/post/${post.id}/${encodeURIComponent(post.title.split(' ').join('-'))}`}
        >
          {post.commentCount} {post.commentCount === 1 ? 'comment' : 'comments'}
        </Link>
      </div>
    </div>
  );
};

export default MiniListPost;
