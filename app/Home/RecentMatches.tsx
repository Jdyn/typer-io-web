import Link from 'next/link';
import Paper from 'components/Shared/Paper';
import formatTime from 'util/formatTime';
import { useGetHiscoresQuery } from 'services/hiscores';
import View from 'components/Shared/View';

import styles from './RecentMatches.module.css';

const RecentMatches = (): JSX.Element => {
  const { data: matches } = useGetHiscoresQuery('recent', { refetchOnMountOrArgChange: true });

  return (
    <section className={styles.root}>
      <Paper title="Recent Matches">
        <View>
          {matches &&
            matches.map((item, index) => (
              <div className={styles.entry} key={item.id}>
                <div className={styles.count}>{index + 1}.</div>
                <div className={styles.content}>
                  <span className={item.user ? styles.verified : ''}>
                    {item.user?.username ? (
                      <Link prefetch={false} href={`/u/${item.user.username}`}>
                        <a className={styles.nameLink}>{item.user?.username}</a>
                      </Link>
                    ) : (
                      item.nickname
                    )}
                  </span>
                  <div className={styles.timestamp}>{formatTime(item.created_at)}</div>
                </div>
                <div className={styles.item}>{item.wpm} WPM</div>
              </div>
            ))}
        </View>
      </Paper>
    </section>
  );
};

export default RecentMatches;
