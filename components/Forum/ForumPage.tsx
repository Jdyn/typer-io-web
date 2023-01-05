import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import formatTime from '../../util/formatTime';
import { AppState } from '../../store';
import Banner from '../Shared/Banner';
import { useGetPostsQuery } from '../../services/forum';
import useNextQueryParams from '../../util/useNextQueryParam';

import styles from './ForumPage.module.css';
import Paginate from '../Shared/Paginate';

const Adsense = dynamic(() => import('../Shared/Adsense'), {
  ssr: false
});

const ForumPage = (): JSX.Element => {
  const { page } = useNextQueryParams();
  const { data: feed } = useGetPostsQuery({ query: 'feed', page });

  const router = useRouter();

  const session = useSelector((state: AppState) => state.session);

  return (
    <div className={styles.root}>
      <Adsense
        client="ca-pub-3148839588626786"
        slot="1319118588"
        style={{ display: 'block' }}
        format="auto"
      />
      <div className={styles.main}>
        {session?.user?.emailVerified === false && (
          <div className={styles.notice}>Please verify your email to post post the forums.</div>
        )}
        <div className={styles.feed}>
          <Banner title="Discussions">
            <div>
              {session?.isLoggedIn && (
                <Link href="/forum/post" className={styles.create}>
                  Create Post ➜
                </Link>
              )}
            </div>
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
                      className={styles.title}
                    >
                      {post.title}
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
          <Paginate
            defaultPage={parseInt(page, 10)}
            totalPages={feed?.totalPages}
            pageUpdated={(newPage) => router.push(`/forum?page=${newPage}`)}
          />
        </div>
      </div>
      <Adsense
        client="ca-pub-3148839588626786"
        slot="4985533875"
        style={{ display: 'block' }}
        format="auto"
      />
    </div>
  );
};

export default ForumPage;
