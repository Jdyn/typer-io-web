import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Comments from '.';
import formatTime from '../../../../util/formatTime';
import styles from './index.module.css';
import { AppState } from '../../../../store';
import Button from '../../../Shared/Button';
import TextBox from '../../../Shared/TextBox';
import Api from '../../../../services/api';
import { fetchPost } from '../../../../store/forum/actions';

interface Props {
  comment: object;
}

const Comment = (props: Props): JSX.Element => {
  const { comment } = props;
  const [showReplyBox, set] = useState(false);
  const [newComment, setComment] = useState({ body: '', parentId: comment.id });
  const dispatch = useDispatch();
  const { postId } = useRouter().query;
  const isLoggedIn = useSelector((state: AppState) => state.session.isLoggedIn);

  const onChange = () => {
    set((prev) => !prev);
  };

  const submitComment = (): void => {
    Api.post(`/forum/post/${postId}/comment`, newComment).then((response) => {
      if (response.ok) {
        dispatch(fetchPost(postId as string));
        setComment((prev) => ({ ...prev, body: '' }));
        set(false);
      }
    });
  };

  return (
    <>
      <div className={styles.container} style={{ marginLeft: 50 * comment.depth }}>
        <div className={styles.wrapper}>
          <div className={styles.portrait} />

          <div className={styles.content}>
            <h3 className={styles.username}>{comment.user.username}</h3>
            <p className={styles.body}>{comment.body}</p>
          </div>
        </div>

        <div className={styles.statusBar}>
          {comment.replyable && isLoggedIn && (
            <button type="button" className={styles.replyButton} onClick={onChange}>
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
              onChange={(e) => setComment({ ...newComment, body: e.target.value })}
            />
            <div className={styles.buttons}>
              <Button onClick={submitComment}>post</Button>
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
