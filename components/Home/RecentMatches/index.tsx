import React, { useEffect, useState } from 'react';
import Banner from '../../Shared/Banner';
import formatTime from '../../../util/formatTime';
import styles from './index.module.css';
import ApiService from '../../../services/api';

interface Props {
  children?: React.ReactNode;
}

const RecentMatches = (): JSX.Element => {
  const [state, set] = useState([]);

  useEffect(() => {
    ApiService.fetch(`/matches?query=recent`).then((response) => {
      if (response.ok) {
        set(response.result.matches);
      }
    });
  }, []);

  const renderBadge = (user) => {
    if (user) {
      if (user.isAdmin) {
        return <span className={styles.admin}>Creator</span>;
      }
    }

    return null;
  };

  return (
    <section className={styles.root}>
      <Banner>
        <h1>Recent Games</h1>
      </Banner>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {state.map((item, index) => (
            <div className={styles.entry} key={item.id}>
              <div className={styles.count}>{index + 1}.</div>
              <div className={styles.content}>
                <div>
                  <span className={item.user ? styles.verified : ''}>
                    {item.user?.username ?? item.nickname ?? 'Guest'}
                  </span>
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
    </section>
  );
};

export default RecentMatches;