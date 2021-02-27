import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Paper from '../../Shared/Paper';
import ApiService from '../../../services/api';
import formatTime from '../../../util/formatTime';
import Filter from '../../Shared/Filter';
import styles from './index.module.css';
import { AppState } from '../../../store';

const filters = [
  {
    name: 'all time',
    key: 'all-time'
  }
];

const Leaderboard = (): JSX.Element => {
  const snippet = useSelector((state: AppState) => state.game.room.snippet);
  const [state, set] = useState([]);

  useEffect(() => {
    if (snippet?.id) {
      ApiService.fetch(`/snippet/${snippet.id}/matches`).then((response) => {
        if (response.ok) {
          set(response.result.matches);
        }
      });
    }
  }, [snippet?.id]);

  const renderBadge = (user): JSX.Element => {
    if (user) {
      if (user.isAdmin) {
        return <span className={styles.admin}>Creator</span>;
      }
    }

    return null;
  };

  return (
    <div className={styles.root}>
      <Paper title="Hiscores">
        <Filter fontSize="15" filters={filters} onClick={null} />
        <div className={styles.container}>
          <div className={styles.wrapper}>
            {state.map((item, index) => (
              <div className={styles.entry} key={item.id}>
                <div className={styles.count}>{index + 1}.</div>
                <div className={styles.portrait} />
                <div className={styles.content}>
                  <div>
                    <span className={item.user ? styles.verified : ''}>
                      {item.user?.username ?? item.nickname ?? 'Guest'}
                    </span>{' '}
                    {renderBadge(item.user)}
                  </div>
                  <div className={styles.timestamp}>
                    {formatTime(item.created_at)}
                  </div>
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

export default Leaderboard;
