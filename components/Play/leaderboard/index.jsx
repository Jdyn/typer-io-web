import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Banner from '../../Shared/Banner';
import ApiService from '../../../services/api';
import formatTime from '../../../util/formatTime';
// import LeaderboardCard from './LeaderboardCard';
import Filter from '../../Shared/Filter';
import styles from './index.module.css';

const filters = [
  {
    name: 'week',
    selected: true
  },
  {
    name: 'month',
    selected: false
  },
  {
    name: 'all time',
    selected: false
  }
];

const Leaderboard = () => {
  const snippet = useSelector((state) => state.game.room.snippet);
  const [state, set] = useState([]);

  useEffect(() => {
    if (snippet.id) {
      ApiService.fetch(`/snippet/${snippet.id}/matches`).then((response) => {
        if (response.ok) {
          const temp = [...response.result.matches];

          for (const match of temp) {
            match.created_at = formatTime(match.created_at);
          }

          set(temp);
        }
      });
    }
  }, [snippet.id]);

  return (
    <div className={styles.root}>
      <Banner>
        <h1>Leaderboard</h1>
      </Banner>
      <Filter extended padding="0 0 10px 0" fontSize={15} filters={filters} onClick={() => {}} />
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {/* {state.map((card, index) => (
            <LeaderboardCard key={index} card={card} />
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
