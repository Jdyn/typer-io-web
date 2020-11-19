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
          <div>This is the about section that is looking pretty good.</div>
        </div>
      </div>
      <div className={styles.statsContainer}>
        <Banner>
          <h3>Overview</h3>
        </Banner>
        <div className={styles.statItemWrapper}>
          <div className={styles.statsItem}>Games Played</div>
          <div className={styles.statsItem}>Average Speed</div>
          <div className={styles.statsItem}>Top Speed</div>
        </div>
      </div>
      <div className={styles.friendsList}>
        <Banner>
          <h3>Friends</h3>
        </Banner>
        <div className={styles.friendsListWrapper}></div>
      </div>
      <div className={styles.historyContainer}>
        <Banner>
          <h3>Matches</h3>
        </Banner>
        <div className={styles.historyWrapper}>Hello</div>
      </div>
    </div>
  );
};

export default Profile;
