import { useRouter } from 'next/router';
import Meta from 'components/Shared/Meta';
import Link from 'next/link';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import formatTime from 'util/formatTime';
import Adsense from 'components/Shared/Adsense';
import TextBox from 'components/Shared/TextBox';
import Button from 'components/Shared/Button';
import Banner from 'components/Shared/Banner';
import PostComment from 'app/Forum/Post/PostComment';
import { useAppSelector } from 'store';
import { useEffect, useState } from 'react';
import { useAddPostCommentMutation, useDeletePostMutation, useGetPostQuery } from 'services/forum';

import styles from 'styles/Post.module.css';

const PostPage = (): JSX.Element => {
  const router = useRouter();
  const [postId, title] = router.query.data || [];

  const session = useAppSelector((state) => state.session);

  const { data: post, isError, error } = useGetPostQuery(postId);
  const [addPostComment, { status, isLoading }] = useAddPostCommentMutation();
  const [deletePost] = useDeletePostMutation();

  const [newComment, setComment] = useState({ body: '', parentId: null });

  const createComment = () => {
    if (newComment.body !== '' && !isLoading) {
      addPostComment({ comment: newComment, postId });
    }
  };

  useEffect(() => {
    if (status === 'fulfilled') {
      setComment((prev) => ({ ...prev, body: '' }));
    }
  }, [status]);

  return (
    <div className={styles.root}>
      <Meta title={`Forum | ${title || ''}`} description={post?.body} />
      <Adsense client="ca-pub-3148839588626786" slot="1319118588" format="auto" />
      <div className={styles.post}>
        <div className={styles.postContainer}>
          <Banner>
            <h3>Discussions</h3>
            <button type="button" className={styles.backButton} onClick={() => router.back()}>
              Back
            </button>
          </Banner>
          <div className={styles.postContent}>
            {post ? (
              <>
                {session.user?.id === post.user.id && (
                  <div className={styles.delete}>
                    <AlertDialog.Root>
                      <AlertDialog.Trigger asChild>
                        <Button secondary padding="5px" width="100px">
                          delete post
                        </Button>
                      </AlertDialog.Trigger>
                      <AlertDialog.Portal>
                        <AlertDialog.Overlay className={styles.overlay} />
                        <AlertDialog.Content className={styles.dialog}>
                          <div>
                            <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
                            <AlertDialog.Description>
                              This action cannot be undone. This will permanently delete your post
                              and all associated comments.
                            </AlertDialog.Description>
                            <div className={styles.buttons}>
                              <AlertDialog.Action asChild>
                                <Button padding="5px" onClick={() => deletePost({ postId })}>
                                  Yes, delete post.
                                </Button>
                              </AlertDialog.Action>
                              <AlertDialog.Cancel asChild>
                                <Button secondary padding="5px">
                                  cancel
                                </Button>
                              </AlertDialog.Cancel>
                            </div>
                          </div>
                        </AlertDialog.Content>
                      </AlertDialog.Portal>
                    </AlertDialog.Root>
                  </div>
                )}
                <div className={styles.header}>
                  <h1>{post.title}</h1>
                  <span>
                    Posted by{' '}
                    <Link href={`/u/${post.user?.username}`}>
                      <a className={styles.nameLink}>{post.user?.username}</a>
                    </Link>{' '}
                    {post.user?.isAdmin && <span className={styles.admin}>Creator</span>}
                    {formatTime(post.createdAt)}
                  </span>
                </div>
                <p className={styles.body}>{post.body}</p>
                <div className={styles.rating} />
                {session.isLoggedIn ? (
                  <div className={styles.createComment}>
                    <TextBox
                      placeholder="Leave a comment"
                      value={newComment.body}
                      onChange={(e) => setComment({ ...newComment, body: e.target.value })}
                    />
                    <div className={styles.buttons}>
                      <Button padding="8px" isPending={isLoading} onClick={createComment}>
                        comment
                      </Button>
                      <Button
                        padding="8px"
                        secondary
                        onClick={() => setComment((prev) => ({ ...prev, body: '' }))}
                      >
                        cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>Log in to comment on this post.</div>
                )}
              </>
            ) : (
              isError && <div>{(error as any)?.data?.error}</div>
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
            {!session.isLoggedIn && <span>Log in to comment on this post</span>}
            {post?.comments?.map((comment) => (
              <PostComment key={comment.id} comment={comment} postId={postId} />
            ))}
          </div>
        </div>
      </div>
      <section>
        <Adsense
          client="ca-pub-3148839588626786"
          slot="1319118588"
          style={{ display: 'block' }}
          format="auto"
        />
      </section>
    </div>
  );
};

export default PostPage;
