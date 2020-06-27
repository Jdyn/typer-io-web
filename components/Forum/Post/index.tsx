import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Banner from '../../Shared/Banner';
import styles from './index.module.css';
import { AppState } from '../../../store';
import { fetchPost } from '../../../store/forum/actions';
import formatTime from '../../../util/formatTime';

interface Props {
  postId: string;
}

const Post = (props: Props): JSX.Element => {
  const { postId } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    if (postId) {
      dispatch(fetchPost(postId));
    }
  }, [dispatch, postId]);

  const post = useSelector((state: AppState) => state.forum?.post);
  const session = useSelector((state: AppState) => state.session);

  return (
    <div className={styles.root}>
      <div className={styles.post}>
        <Banner>
          <h1>Post</h1>
        </Banner>
        {post && (
          <div className={styles.postContainer}>
            <div className={styles.header}>
              <h1>{post.title}</h1>
              <span>
                posted by {post?.user?.username} {formatTime(post.inserted_at)}
              </span>
            </div>
            <p className={styles.body}>{post.body}</p>
            <div className={styles.rating} />
            {session.isLoggedIn ? (
              <div className={styles.createComment}>
                {/* <TextBox
                  placeholder="Leave a comment"
                  value={newComment.body}
                  onChange={(e) => setNewComment({ body: e.target.value })}
                />
                <div>
                  <Button secondary margin="0 10px 0 0" onClick={() => setNewComment({ body: '' })}>
                    cancel
                  </Button>
                  <Button onClick={(e) => submitComment(e, null, newComment, null)}>post</Button>
                </div> */}
              </div>
            ) : (
              <div>Log in to comment on this post.</div>
            )}
          </div>
        )}
      </div>
      <div className={styles.comments}>
        <Banner>
          <h1>Comments</h1>
        </Banner>
        <div className={styles.commentsInfo}>
          <h2>
            {post && post.comment_count} Comment
            {post && post.comment_count === 1 ? '' : 's'}
          </h2>
        </div>
        {/* <PostComments
          submitComment={submitComment}
          comments={post ? post.comments : []}
          isLoggedIn={isLoggedIn}
        /> */}
      </div>
    </div>
  );
};

export default Post;
