import Link from 'next/link';
import React from 'react';
import { Post } from '../../../store/forum/types';
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
          href={`/forum/post/${post.id}/${encodeURIComponent(post.title.split(' ').join('-'))}`}
        >
          <a className={styles.title}>{post.title}</a>
        </Link>
        <span>
          {`${formatTime(post.createdAt)} by `}
          <Link prefetch={false} href={`/u/${post.user.username}`}>
            <a>{post.user.username}</a>
          </Link>
          {post.user.isAdmin && <span className={styles.admin}>Creator</span>}
        </span>
        <p>{post.body}</p>
        {post.commentCount > 0 && (
          <span className={styles.updatedAt}>Last comment {formatTime(post.updatedAt)}</span>
        )}
        <Link
          prefetch={false}
          href={`/forum/post/${post.id}/${encodeURIComponent(post.title.split(' ').join('-'))}`}
        >
          <a className={styles.comment}>
            {post.commentCount} {post.commentCount === 1 ? 'comment' : 'comments'}
          </a>
        </Link>
      </div>
    </div>
  );
};

export default MiniListPost;
