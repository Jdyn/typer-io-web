import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import formatTime from '../../../util/formatTime';
import { AppState } from '../../../store';
import Button from '../../Shared/Button';
import TextBox from '../../Shared/TextBox';
import { useAddPostCommentMutation } from '../../../services/forum';
import { Comment } from '../../../services/types';

import styles from './PostComment.module.css';

interface Props {
  comment: Comment;
  postId: string;
}

const PostComment = (props: Props): JSX.Element => {
  const { comment, postId } = props;
  const [showReplyBox, set] = useState(false);

  const [addPostComment, { status, isLoading }] = useAddPostCommentMutation();

  const [newComment, setComment] = useState({ body: '', parentId: comment.id });

  const isLoggedIn = useSelector((state: AppState) => state.session.isLoggedIn);
  const isAdmin = useSelector((state: AppState) => state.session?.user?.isAdmin || false);

  useEffect(() => {
    if (status === 'fulfilled') {
      setComment((prev) => ({ ...prev, body: '' }));
      set((prev) => !prev);
    }
  }, [status]);

  return (
    <>
      <div className={styles.container} style={{ marginLeft: `${4 * comment.depth}vw` }}>
        <div className={styles.wrapper}>
          <div className={styles.portrait} />

          <div className={styles.content}>
            <h3 className={styles.username}>
              <Link href={`/u/${comment.user.username}`}>
                <span className={styles.nameLink}>{comment.user?.username}</span>
              </Link>{' '}
              {comment.user.isAdmin && <span className={styles.admin}>Creator</span>}
            </h3>
            <p className={styles.body}>{comment.body}</p>
          </div>
        </div>

        <div className={styles.statusBar}>
          {comment.replyable && isLoggedIn && (
            <button
              type="button"
              className={styles.replyButton}
              onClick={() => set((prev) => !prev)}
            >
              reply
            </button>
          )}
          <span className={styles.seperator}>•</span>
          <span>{formatTime(comment.createdAt)}</span>
          {isAdmin && (
            <>
              <span className={styles.seperator}>•</span>
              <span>ID: {comment?.id}</span>
            </>
          )}
        </div>

        {showReplyBox && (
          <div>
            <TextBox
              placeholder="Leave a comment"
              value={newComment.body}
              onChange={(e) => setComment({ ...newComment, body: e.target.value })}
            />
            <div className={styles.buttons}>
              <Button
                color="#fff"
                padding="8px"
                isPending={isLoading}
                onClick={() => !isLoading && addPostComment({ comment: newComment, postId })}
              >
                post
              </Button>
              <Button padding="8px" secondary onClick={() => set((prev) => !prev)}>
                cancel
              </Button>
            </div>
          </div>
        )}
      </div>
      {comment?.comments?.map((item) => (
        <PostComment key={item.id} comment={item} postId={postId} />
      ))}
    </>
  );
};

export default PostComment;
