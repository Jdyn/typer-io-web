import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Paper from '../../Shared/Paper';
import ApiService from '../../../services/api';
import formatTime from '../../../util/formatTime';
import Filter from '../../Shared/Filter';
import styles from './index.module.css';
import { AppState } from '../../../store';
import Adsense from '../../Shared/Adsense';
import Link from 'next/link';

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
                <div className={styles.content}>
                  <span className={item.user ? styles.verified : ''}>
                    {item.user?.username ? (
                      <Link href={`/u/${item.user.username}`}>
                        <a
                          target="_blank"
                          rel="noreferrer noopener"
                          className={styles.nameLink}
                        >
                          {item.user?.username}
                        </a>
                      </Link>
                    ) : (
                      item.nickname
                    )}
                  </span>
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
      <section
        style={{
          margin: '20px 0px',
          maxWidth: '540px !important'
        }}
      >
        <Adsense
          client="ca-pub-3148839588626786"
          layout="in-article"
          slot="6958577240"
          format="fluid"
        />
      </section>
    </div>
  );
};

export default Leaderboard;
