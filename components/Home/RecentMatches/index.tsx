import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Paper from '../../Shared/Paper';
import formatTime from '../../../util/formatTime';
import styles from './index.module.css';
import ApiService from '../../../services/api';

const RecentMatches = (): JSX.Element => {
  const [state, set] = useState([]);

  useEffect(() => {
    // ApiService.fetch(`/matches?query=recent`).then((response) => {
    //   if (response.ok) {
    //     set(response.result.matches);
    //   }
    // });
  }, []);

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
            {state.map((item, index) => (
              <div className={styles.entry} key={item.id}>
                <div className={styles.count}>{index + 1}.</div>
                <div className={styles.content}>
                  <div>
                    <span className={item.user ? styles.verified : ''}>
                      {item.user?.username ? (
                        <Link href={`/u/${item.user.username}`}>
                          <a className={styles.nameLink}>
                            {item.user?.username}
                          </a>
                        </Link>
                      ) : (
                        item.nickname
                      )}
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
      </Paper>
    </section>
  );
};

export default RecentMatches;
