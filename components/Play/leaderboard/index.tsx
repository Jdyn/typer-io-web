import { memo } from 'react';
import Link from 'next/link';
import Paper from '../../Shared/Paper';
import formatTime from '../../../util/formatTime';
import IFilter from '../../Shared/Filter';
import styles from './index.module.css';
import { useAppSelector } from '../../../store';

const filters = [
  {
    name: 'all time',
    key: 'all-time'
  }
];

const Leaderboard = (): JSX.Element => {
  const matches = useAppSelector((state) => state.game.room.leaderboard);
  return (
    <div className={styles.root}>
      <Paper title="Snippet Hiscores">
        <IFilter fontSize="15" filters={filters} onClick={null} />
        <div className={styles.container}>
          <div className={styles.wrapper}>
            {matches?.length > 0 &&
              matches.map((item, index) => (
                <div className={styles.entry} key={item.id}>
                  <div className={styles.count}>{index + 1}.</div>
                  <div className={styles.content}>
                    <span className={styles.nameLink}>
                      {item.user?.username ? (
                        <Link
                          target="_blank"
                          rel="noreferrer noopener"
                          href={`/u/${item.user.username}`}
                        >
                          {item.user?.username}
                        </Link>
                      ) : (
                        item.nickname
                      )}
                      {formatTime(item.created_at) === 'Just now' && (
                        <span className={styles.newBadge}>NEW</span>
                      )}
                    </span>
                    <div className={styles.timestamp}>{formatTime(item.created_at)}</div>
                  </div>
                  <div className={styles.item}>{item.wpm} WPM</div>
                </div>
              ))}
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default memo(Leaderboard);
