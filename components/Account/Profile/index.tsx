import React from 'react';
import Banner from '../../Shared/Banner';
import styles from './index.module.css';

const Profile = (): JSX.Element => {
  return (
    <div className={styles.root}>
      <div className={styles.headerContainer}>
        <Banner>
          <h3>Profile</h3>
        </Banner>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div className={styles.portrait} />
            <div className={styles.content}>
              <span>Username</span>
              <span>Joined 3 years ago</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.statsContainer}>
        <div className={styles.statsItem}>
          <div className={styles.statItemWrapper}>
            <span>Games Played</span>
            <span>Games Played</span>
          </div>
        </div>
        <div className={styles.statsItem}>
          <div className={styles.statItemWrapper}>Total Time</div>
        </div>
        <div className={styles.statsItem}>
          <div className={styles.statItemWrapper}>Total Time</div>
        </div>
        {/* <div className={styles.statsItem}>
          <div className={styles.statItemWrapper}>Total Time</div>
        </div> */}
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
