import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { fetchPosts } from '../../store/forum/actions';
import formatTime from '../../util/formatTime';
import Adsense from '../Shared/Adsense';
import { AppState } from '../../store';
import Banner from '../Shared/Banner';

import styles from './index.module.css';

const ForumPage = (): JSX.Element => {
  const router = useRouter();
  const dispatch = useDispatch();
  const feed = useSelector((state: AppState) => state.forum.feed);
  const session = useSelector((state: AppState) => state.session);
  const { page } = router.query;

  useEffect(() => {
    if (router.isReady) {
      dispatch(fetchPosts('feed', page as string));
    }
  }, [dispatch, page, router.isReady]);

  const setPage = (index) => {
    if (index <= feed?.totalPages && index >= 1 && index !== feed?.page) {
      router.push(`/forum?page=${index}`);
    }
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
      <div className={styles.main}>
        <div className={styles.feed}>
          <Banner>
            <h3>
              Discussions{' '}
              {session?.isLoggedIn && (
                <Link href="/forum/post">
                  <a className={styles.create}>Create Post ➜</a>
                </Link>
              )}
            </h3>
          </Banner>
          <div className={styles.feedContainer}>
            <div className={styles.feedWrapper}>
              {feed.data?.map((post) => (
                <li className={styles.feedItem} key={post.id}>
                  <div className={styles.portrait} />
                  <div className={styles.feedContent}>
                    <Link
                      href={`/forum/post/${post.id}/${encodeURIComponent(
                        post.title.split(' ').join('-')
                      )}`}
                    >
                      <a className={styles.title}>{post.title}</a>
                    </Link>
                    {session?.user?.isAdmin && <span>ID: {post.id}</span>}
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
              onClick={() => setPage(feed?.page - 1)}
              type="button"
            >{`<`}</button>
            <span>{feed?.page}</span>
            <button
              className={styles.pageButton}
              onClick={() => setPage(feed?.page + 1)}
              type="button"
            >{`>`}</button>
            <button
              className={styles.pageButton}
              onClick={() => setPage(feed?.totalPages)}
              type="button"
            >
              {feed?.totalPages || 1}
            </button>
          </div>
        </div>
      </div>
      <section>
        <Adsense
          client="ca-pub-3148839588626786"
          slot="4985533875"
          style={{ display: 'block' }}
          format="auto"
          responsive="true"
        />
      </section>
    </div>
  );
};

export default ForumPage;
