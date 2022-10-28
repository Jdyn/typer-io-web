import Link from 'next/link';
import Paper from '../../Shared/Paper';
import formatTime from '../../../util/formatTime';
import styles from './index.module.css';
import { useGetHiscoresQuery } from '../../../services/hiscores';

const RecentMatches = (): JSX.Element => {
  const { data: matches } = useGetHiscoresQuery('recent', { refetchOnMountOrArgChange: true });

  const renderBadge = (user): JSX.Element => {
    if (user) {
      if (user.isAdmin) {
        return <span className={styles.admin}>Creator</span>;
      }
    }

    return null;
  };

  return (
    <section className={styles.root}>
      <Paper title="Recent Matches">
        <div className={styles.container}>
          <div className={styles.wrapper}>
            {matches &&
              matches.map((item, index) => (
                <div className={styles.entry} key={item.id}>
                  <div className={styles.count}>{index + 1}.</div>
                  <div className={styles.content}>
                    <>
                      <span className={item.user ? styles.verified : ''}>
                        {item.user?.username ? (
                          <Link
                            className={styles.nameLink}
                            prefetch={false}
                            href={`/u/${item.user.username}`}
                          >
                            {item.user?.username}
                          </Link>
                        ) : (
                          item.nickname
                        )}
                      </span>
                      {renderBadge(item.user)}
                    </>
                    <div className={styles.timestamp}>{formatTime(item.created_at)}</div>
                  </div>
                  <div className={styles.item}>{item.wpm} WPM</div>
                </div>
              ))}
          </div>
        </div>
      </Paper>
    </section>
  );
};

export default RecentMatches;
