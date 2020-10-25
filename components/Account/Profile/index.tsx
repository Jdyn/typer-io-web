import React from 'react';
import Banner from '../../Shared/Banner';
import styles from './index.module.css';

const Profile = (): JSX.Element => {
  return (
    <div className={styles.root}>
      <div className={styles.headerContainer}>
        <div className={styles.wrapper}>
          <div className={styles.portrait} />
          <div className={styles.content}>
            <span>Username</span>
            <span>Joined 3 years ago</span>
          </div>
        </div>
      </div>
      <div className={styles.statContainer}>
        <Banner>
          <h3>Stats</h3>
        </Banner>
        <div className={styles.statWrapper}>hello</div>
      </div>
      <div className={styles.historyContainer}>
        <Banner>
          <h3>Match History</h3>
        </Banner>
        <div className={styles.historyWrapper}>Hello</div>
      </div>
    </div>
  );
};

export default Profile;
