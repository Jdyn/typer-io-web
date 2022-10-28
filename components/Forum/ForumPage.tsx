import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import formatTime from '../../util/formatTime';
import Adsense from '../Shared/Adsense';
import { AppState } from '../../store';
import Banner from '../Shared/Banner';
import { useGetPostsQuery } from '../../services/forum';
import useNextQueryParams from '../../util/useNextQueryParam';

import styles from './ForumPage.module.css';

const ForumPage = (): JSX.Element => {
  const { page } = useNextQueryParams();
  const router = useRouter();
  const { data: feed } = useGetPostsQuery({ query: 'feed', page });

  const session = useSelector((state: AppState) => state.session);

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
        />
      </section>
      <div className={styles.main}>
        {session?.user?.emailVerified === false && (
          <div className={styles.notice}>Please verify your email to use the forums.</div>
        )}
        <div className={styles.feed}>
          <Banner>
            <h3>
              Discussions{' '}
              {session?.isLoggedIn && (
                <Link href="/forum/post">
                  <span className={styles.create}>Create Post ➜</span>
                </Link>
              )}
            </h3>
          </Banner>
          <div className={styles.feedContainer}>
            <div className={styles.feedWrapper}>
              {feed?.data?.map((post) => (
                <li className={styles.feedItem} key={post.id}>
                  {/* <div className={styles.portrait} /> */}
                  <div className={styles.feedContent}>
                    <Link
                      href={`/forum/post/${post.id}/${encodeURIComponent(
                        post.title.split(' ').join('-')
                      )}`}
                    >
                      <span className={styles.title}>{post.title}</span>
                    </Link>
                    {session?.user?.isAdmin && <span>ID: {post.id}</span>}
                    <span>
                      Posted {formatTime(post.createdAt)} by{' '}
                      <Link href={`/u/${post.user.username}`}>
                        <span className={styles.nameLink}>{post.user?.username}</span>
                      </Link>{' '}
                      {post.user.isAdmin && <span className={styles.admin}>Creator</span>}
                    </span>
                    {post.commentCount > 0 && (
                      <span>Last comment {formatTime(post.updatedAt)}</span>
                    )}
                    <Link
                      className={styles.comment}
                      prefetch={false}
                      href={`/forum/post/${post.id}`}
                    >
                      {post.commentCount} comment
                      {post.commentCount === 1 ? '' : 's'}
                    </Link>
                  </div>
                </li>
              ))}
            </div>
          </div>
          <div className={styles.pagination}>
            <button className={styles.pageButton} onClick={() => setPage(1)} type="button">
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
        />
      </section>
    </div>
  );
};

export default ForumPage;
