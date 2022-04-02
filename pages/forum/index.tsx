import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import formatTime from 'util/formatTime';
import Adsense from 'components/Shared/Adsense';
import { AppState } from 'store';
import Banner from 'components/Shared/Banner';
import { useGetPostsQuery } from 'services/forum';
import useQueryParams from 'Hooks/useQueryParams';

import styles from 'styles/Forum.module.css';
import View from 'components/Shared/View';

const ForumPage = (): JSX.Element => {
  const { page } = useQueryParams();
  const router = useRouter();
  const { data: feed } = useGetPostsQuery({ query: 'feed', page });

  const session = useSelector((state: AppState) => state.session);

  const setPage = (index) => {
    if (index <= feed?.totalPages && index >= 1 && index !== feed?.page) {
      router.push(`/forum?page=${index}`);
    }
  };

  return (
    <main className={styles.root}>
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
                  <a className={styles.create}>Create Post ➜</a>
                </Link>
              )}
            </h3>
          </Banner>
          <View>
            {feed?.data?.map((post) => (
              <li className={styles.feedItem} key={post.id}>
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
                    {post.user.isAdmin && <span className={styles.admin}>Creator</span>}
                  </span>
                  {post.commentCount > 0 && <span>Last comment {formatTime(post.updatedAt)}</span>}
                  <Link prefetch={false} href={`/forum/post/${post.id}`}>
                    <a className={styles.comment}>
                      {post.commentCount} comment
                      {post.commentCount === 1 ? '' : 's'}
                    </a>
                  </Link>
                </div>
              </li>
            ))}
          </View>
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
    </main>
  );
};

export default ForumPage;
