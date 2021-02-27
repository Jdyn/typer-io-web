import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './index.module.css';
import Banner from '../Shared/Banner';
import { fetchPosts } from '../../store/forum/actions';
import { AppState } from '../../store';
import formatTime from '../../util/formatTime';
import Button from '../Shared/Button';

const Forum = (): JSX.Element => {
  const router = useRouter();
  const dispatch = useDispatch();
  const page = useSelector((state: AppState) => state.forum.feed.page);
  const session = useSelector((state: AppState) => state.session);
  const { page: pageNumber } = router.query;

  useEffect(() => {
    dispatch(fetchPosts('PAGE', (pageNumber as string) || '1'));
  }, [dispatch, pageNumber]);

  const setPage = (index) => {
    if (index <= page?.postMaxPage && index >= 1 && index !== page?.postPage) {
      router.push(`/forum?page=${index}`);
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.feed}>
        <Banner>
          <h1>Discussions</h1>
        </Banner>
        {session?.isLoggedIn && (
          <div className={styles.create}>
            <Link href="/forum/post">
              <Button color="#fff" padding="10px" margin="10px 20px 0px 10px">
                Create Post
              </Button>
            </Link>
          </div>
        )}
        <div className={styles.feedContainer}>
          <div className={styles.feedWrapper}>
            {page.posts?.map((post) => (
              <li className={styles.feedItem} key={post.id}>
                <div className={styles.portrait} />
                <div className={styles.feedContent}>
                  <Link prefetch={false} href={`/forum/post/${post.id}`}>
                    <a className={styles.title}>{post.title}</a>
                  </Link>
                  {session?.user?.is_admin && <span>ID: {post.id}</span>}
                  <span>
                    Posted {formatTime(post.createdAt)} by{' '}
                    <Link href={`/u/${post.user.username}`}>
                      <a className={styles.nameLink}>{post.user?.username}</a>
                    </Link>{' '}
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
      <div className={styles.pagination}>
        <button
          className={styles.pageButton}
          onClick={() => setPage(1)}
          type="button"
        >
          1
        </button>
        <button
          className={styles.pageButton}
          onClick={() => setPage(page?.postPage - 1)}
          type="button"
        >{`<`}</button>
        <span>{page?.postPage}</span>
        <button
          className={styles.pageButton}
          onClick={() => setPage(page?.postPage + 1)}
          type="button"
        >{`>`}</button>
        <button
          className={styles.pageButton}
          onClick={() => setPage(page?.postMaxPage)}
          type="button"
        >
          {page?.postMaxPage || 1}
        </button>
      </div>
    </div>
  );
};

export default Forum;
