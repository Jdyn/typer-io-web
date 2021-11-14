import { memo, useEffect } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Paper from '../../Shared/Paper';
import formatTime from '../../../util/formatTime';
import IFilter from '../../Shared/Filter';
import styles from './index.module.css';
import { AppState } from '../../../store';
import { useGetQuoteHiscoresQuery } from '../../../services/hiscores';

const filters = [
  {
    name: 'all time',
    key: 'all-time'
  }
];

interface Props {
  clientsComplete: number;
}

const Leaderboard = ({ clientsComplete }: Props): JSX.Element => {
  const snippet = useSelector((state: AppState) => state.game.room.snippet);

  const { data: matches, refetch } = useGetQuoteHiscoresQuery(snippet.id);

  useEffect(() => {
    refetch();
  }, [clientsComplete, refetch]);

  return (
    <div className={styles.root}>
      <Paper title="Hiscores">
        <IFilter fontSize="15" filters={filters} onClick={null} />
        <div className={styles.container}>
          <div className={styles.wrapper}>
            {matches &&
              matches.map((item, index) => (
                <div className={styles.entry} key={item.id}>
                  <div className={styles.count}>{index + 1}.</div>
                  <div className={styles.content}>
                    <span className={styles.nameLink}>
                      {item.user?.username ? (
                        <Link href={`/u/${item.user.username}`}>
                          <a target="_blank" rel="noreferrer noopener">
                            {item.user?.username}
                          </a>
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
