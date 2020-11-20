import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Comments from '.';
import formatTime from '../../../../util/formatTime';
import styles from './index.module.css';
import { AppState } from '../../../../store';
import Button from '../../../Shared/Button';
import TextBox from '../../../Shared/TextBox';
import Api from '../../../../services/api';
import { fetchPost } from '../../../../store/forum/actions';

interface Props {
  comment: any;
}

const Comment = (props: Props): JSX.Element => {
  const { comment } = props;
  const [showReplyBox, set] = useState(false);
  const [newComment, setComment] = useState({ body: '', parentId: comment.id });
  const dispatch = useDispatch();
  const { postId } = useRouter().query;
  const isLoggedIn = useSelector((state: AppState) => state.session.isLoggedIn);
  const [isPending, setPending] = useState(false);
  const onChange = () => {
    set((prev) => !prev);
  };

  const submitComment = (): void => {
    setPending(true);
    Api.post(`/forum/post/${postId}/comment`, newComment).then((response) => {
      if (response.ok) {
        dispatch(fetchPost(postId as string));
        setComment((prev) => ({ ...prev, body: '' }));
        set(false);
        setPending(false);
      } else {
        setPending(false);
      }
    });
  };

  return (
    <>
      <div
        className={styles.container}
        style={{ marginLeft: `${4 * comment.depth}vw` }}
      >
        <div className={styles.wrapper}>
          <div className={styles.portrait} />

          <div className={styles.content}>
            <h3 className={styles.username}>
              <Link href={`/u/${comment.user.username}`}>
                <span className={styles.nameLink}>
                  {comment.user?.username}
                </span>
              </Link>{' '}
              {comment.user.isAdmin && (
                <span className={styles.admin}>Creator</span>
              )}
            </h3>
            <p className={styles.body}>{comment.body}</p>
          </div>
        </div>

        <div className={styles.statusBar}>
          {comment.replyable && isLoggedIn && (
            <button
              type="button"
              className={styles.replyButton}
              onClick={onChange}
            >
              reply
            </button>
          )}
          <span className={styles.seperator}>•</span>
          <span>{formatTime(comment.createdAt)}</span>
        </div>

        {showReplyBox && (
          <div>
            <TextBox
              placeholder="Leave a comment"
              value={newComment.body}
              onChange={(e) =>
                setComment({ ...newComment, body: e.target.value })
              }
            />
            <div className={styles.buttons}>
              <Button
                color="#fff"
                isPending={isPending}
                onClick={submitComment}
              >
                post
              </Button>
              <Button onClick={onChange}>cancel</Button>
            </div>
          </div>
        )}
      </div>

      <Comments comments={comment?.comments || []} parentId={comment?.id} />
    </>
  );
};

export default Comment;
