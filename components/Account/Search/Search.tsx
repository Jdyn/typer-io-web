import { useRouter } from 'next/router';
import Link from 'next/link';
import Paper from '../../Shared/Paper';
import { useSearchUserQuery } from '../../../services/account';

import styles from './Search.module.css';
import formatTime from '../../../util/formatTime';
import Paginate from '../../Shared/Paginate';

const SearchPage = (): JSX.Element => {
  const router = useRouter();
  const { user, page } = router.query;

  const { data: userPage, isSuccess } = useSearchUserQuery({
    username: user as string,
    page: page as string
  });

  return (
    <main className={styles.root}>
      <Paper title={`Search Results - ${user as string}`}>
        <div className={styles.container}>
          {isSuccess && (
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
          )}
        </div>
        <Paginate
          pageUpdated={(newPage) => router.push(`/search/${user}?page=${newPage}`)}
          totalPages={userPage.totalPages}
        />
      </Paper>
    </main>
  );
};

export default SearchPage;
