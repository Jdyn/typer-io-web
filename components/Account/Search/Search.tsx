import { useRouter } from 'next/router';
import Link from 'next/link';
import Paper from '../../Shared/Paper';
import { useSearchUserQuery } from '../../../services/account';

import styles from './Search.module.css';
import formatTime from '../../../util/formatTime';

const SearchPage = (): JSX.Element => {
  const router = useRouter();
  const { user, page } = router.query;

  const { data: userPage } = useSearchUserQuery({
    username: user as string,
    page: page as string
  });

  const updatePage = (newPage) => {
    router.push(`/search/${user}?page=${newPage}`);
  };

  return (
    <main className={styles.root}>
      <Paper title={`Search Results - ${user as string}`}>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            {userPage?.data?.length > 0 ? (
              userPage?.data?.map((item) => (
                <Link key={item.username} href={`/u/${item.username}`}>
                  <div className={styles.entry}>
                    <div>
                      <span className={styles.nameLink}>{item.username}</span>
                      {item.isAdmin && <span className={styles.admin}>Creator</span>}
                    </div>
                    <span>
                      {item.country && `${item.country} - `}
                      {`Joined ${formatTime(item.insertedAt)}`}
                    </span>
                    {item.bio && <p>{item.bio}</p>}
                  </div>
                </Link>
              ))
            ) : (
              <div style={{ textAlign: 'center' }}>No search results found.</div>
            )}
          </div>
        </div>
        <div className={styles.pagination}>
          <button
            className={styles.pageButton}
            onClick={() => userPage && updatePage(1)}
            type="button"
          >
            1
          </button>
          <button
            className={styles.pageButton}
            onClick={() => userPage && updatePage(userPage.page - 1)}
            type="button"
          >{`<`}</button>
          <span>{userPage?.page}</span>
          <button
            className={styles.pageButton}
            onClick={() => userPage && updatePage(userPage.page + 1)}
            type="button"
          >{`>`}</button>
          <button
            className={styles.pageButton}
            onClick={() => userPage && updatePage(userPage.totalPages)}
            type="button"
          >
            {userPage?.totalPages || 1}
          </button>
        </div>
      </Paper>
    </main>
  );
};

export default SearchPage;
