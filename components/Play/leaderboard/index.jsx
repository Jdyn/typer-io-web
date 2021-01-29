import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Banner from '../../Shared/Banner';
import ApiService from '../../../services/api';
import formatTime from '../../../util/formatTime';
import Filter from '../../Shared/Filter';
import styles from './index.module.css';

const filters = [
  {
    name: 'all time',
    selected: false
  }
];

const Leaderboard = () => {
  const snippet = useSelector((state) => state.game.room.snippet);
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

  const renderBadge = (user) => {
    if (user) {
      if (user.isAdmin) {
        return <span className={styles.admin}>Creator</span>;
      }
    }

    return null;
  };

  return (
    <div className={styles.root}>
      <Banner>
        <h1>Leaderboard</h1>
      </Banner>
      {/* <Filter
        padding="0 0 10px 0"
        fontSize={15}
        filters={filters}
        onClick={() => {}}
      /> */}
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {state.map((item) => (
            <div className={styles.entry} key={item.id}>
              {/* <div className={styles.count}>{index + 1}.</div> */}
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
    </div>
  );
};

export default Leaderboard;
