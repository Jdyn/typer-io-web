import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import Banner from '../../Shared/Banner';
import styles from './index.module.css';
import { AppState } from '../../../store';
import { fetchPost } from '../../../store/forum/actions';
import formatTime from '../../../util/formatTime';
import Comments from './Comments';
import TextBox from '../../Shared/TextBox';
import Button from '../../Shared/Button';
import Api from '../../../services/api';
import { updatePost } from '../../../store/forum/reducers';
import Adsense from '../../Shared/Adsense';

interface Props {
  postId: string;
}

const Post = (props: Props): JSX.Element => {
  const { postId } = props;
  const dispatch = useDispatch();
  const [newComment, setComment] = useState({ body: '', parentId: null });

  useEffect(() => {
    if (postId) {
      dispatch(fetchPost(postId));
    }
  }, [dispatch, postId]);

  const post = useSelector((state: AppState) => state.forum?.post);
  const isLoggedIn = useSelector((state: AppState) => state.session.isLoggedIn);

  useEffect(() => {
    return () => {
      dispatch(updatePost({ post: null }));
    };
  }, [dispatch]);

  const submitComment = (): void => {
    Api.post(`/forum/post/${postId}/comment`, newComment).then((response) => {
      if (response.ok) {
        dispatch(fetchPost(postId));
        setComment((prev) => ({ ...prev, body: '' }));
      }
    });
  };

  return (
    <div className={styles.root}>
      <section>
        <Adsense
          client="ca-pub-3148839588626786"
          slot="1319118588"
          style={{ display: 'block' }}
          format="auto"
          responsive="true"
        />
      </section>
      <div className={styles.post}>
        <div className={styles.postContainer}>
          <Banner>
            <h3>Discussions</h3>
          </Banner>
          <div className={styles.postContent}>
            {post && (
              <>
                <div className={styles.header}>
                  <h1>{post.title}</h1>
                  <span>
                    posted by{' '}
                    <Link href={`/u/${post.user.username}`}>
                      <a className={styles.nameLink}>{post.user?.username}</a>
                    </Link>{' '}
                    {post.user?.isAdmin && (
                      <span className={styles.admin}>Creator</span>
                    )}
                    {formatTime(post.createdAt)}
                  </span>
                </div>
                <p className={styles.body}>{post.body}</p>
                <div className={styles.rating} />
                {isLoggedIn ? (
                  <div className={styles.createComment}>
                    <TextBox
                      placeholder="Leave a comment"
                      value={newComment.body}
                      onChange={(e) =>
                        setComment({ ...newComment, body: e.target.value })
                      }
                    />
                    <div className={styles.buttons}>
                      <Button padding="6px 20px" onClick={submitComment}>
                        comment
                      </Button>
                      <Button
                        padding="6px 27px"
                        secondary
                        onClick={() =>
                          setComment((prev) => ({ ...prev, body: '' }))
                        }
                      >
                        cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>Log in to comment on this post.</div>
                )}
              </>
            )}
          </div>
        </div>
        <div className={styles.comments}>
          <Banner>
            <h3>
              {post && post.commentCount}
              {post && post.commentCount === 1 ? ' Comment' : ' Comments'}{' '}
            </h3>
          </Banner>
          <div className={styles.commentsContainer}>
            {!isLoggedIn && <span>Log in to comment on this post</span>}
            <Comments comments={post?.comments || []} />
          </div>
        </div>
      </div>
      <section>
        <Adsense
          client="ca-pub-3148839588626786"
          slot="1319118588"
          style={{ display: 'block' }}
          format="auto"
          responsive="true"
        />
      </section>
    </div>
  );
};

export default Post;
