import { useRouter } from 'next/router';
import Link from 'next/link';
import Paper from '../../Shared/Paper';
import { useSearchUserQuery } from '../../../services/account';

import styles from './Search.module.css';
import formatTime from '../../../util/formatTime';
import Paginate from '../../Shared/Paginate';

interface SearchProps {
  term: string | string[];
  page: string | string[];
}

const SearchPage = ({ term, page }: SearchProps): JSX.Element => {
  const router = useRouter();

  const { data: userPage, isSuccess } = useSearchUserQuery({
    username: term as string,
    page: page as string
  });

  return (
    <main className={styles.root}>
      <Paper title={`Search Results - ${term as string}`}>
        <div className={styles.container}>
          {isSuccess && (
            <div className={styles.wrapper}>
              {userPage?.data?.length > 0 ? (
                userPage?.data?.map((item) => (
                  <Link className={styles.entry} key={item.username} href={`/u/${item.username}`}>
                    <div>
                      <span className={styles.nameLink}>{item.username}</span>
                      {item.isAdmin && <span className={styles.admin}>Creator</span>}
                    </div>
                    <span>
                      {item.country && `${item.country} - `}
                      {`Joined ${formatTime(item.insertedAt)}`}
                    </span>
                    {item.bio && <p>{item.bio}</p>}
                  </Link>
                ))
              ) : (
                <div style={{ textAlign: 'center' }}>No search results found.</div>
              )}
            </div>
          )}
        </div>
        <Paginate
          defaultPage={1}
          pageUpdated={(newPage) => router.push(`/search/${term}?page=${newPage}`)}
          totalPages={userPage?.totalPages}
        />
      </Paper>
    </main>
  );
};

export default SearchPage;
