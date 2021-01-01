import { useEffect, useState } from 'react';
import Banner from '../../Shared/Banner';
import styles from './index.module.css';
import ApiService from '../../../services/api';
import formatTime from '../../../util/formatTime';

interface Props {
  username: string;
  // matchesPageQuery: string;
}

const Profile = (props: Props): JSX.Element => {
  const { username } = props;

  const [user, set] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (username) {
      setError(null);
      ApiService.fetch(`/user/${username}`).then((response) => {
        if (response.ok) {
          set(response?.result?.user);
        } else {
          setError('There was an error finding this player.');
        }
      });
    }
  }, [username]);

  const fetchMatches = (page: number): void => {
    if (page <= user.matchMaxPage && page >= 1 && page !== user.matchPage) {
      ApiService.fetch(`/user/${username}/matches?matchPage=${page}`).then(
        (response) => {
          if (response.ok && response.result.matches) {
            set({ ...user, ...response.result });
          }
        }
      );
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.headerContainer}>
        <Banner>
          <h3>Profile</h3>
        </Banner>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div className={styles.profilePortrait} />
            <div className={styles.content}>
              <h3>{user?.username}</h3>
              <span>{user && `Joined ${formatTime(user?.insertedAt)}`}</span>
            </div>
          </div>
          <div>{error && error}</div>
        </div>
      </div>
      <div className={styles.statsContainer}>
        <Banner>
          <h3>Overview</h3>
        </Banner>
        <div className={styles.statItemWrapper}>
          <div className={styles.statsItem}>
            <h3>Total Matches</h3>
            <span>{user?.matchCount}</span>
            <div>Played</div>
          </div>
          <div className={styles.statsItem}>
            <h3>Average Speed</h3>
            <span>{user?.averageWpm}</span>
            <div>WPM</div>
          </div>
          <div className={styles.statsItem}>
            <h3>Top Speed</h3>
            <span>{user?.topWpm}</span>
            <div>WPM</div>
          </div>
        </div>
      </div>
      <div className={styles.friendsList}>
        <Banner>
          <h3>Friends</h3>
        </Banner>
        <div className={styles.friendsListWrapper}>Coming soon...</div>
      </div>
      <div className={styles.historyRoot}>
        <Banner>
          <h3>Matches</h3>
        </Banner>
        <div className={styles.header}>
          <div className={styles.headerItem}>Name</div>
          <div className={styles.headerItem}>Date</div>
          <div className={styles.headerItem}>Accuracy</div>
          <div className={styles.headerItem}>WPM</div>
        </div>
        <div className={styles.historyContainer}>
          <div className={styles.historyWrapper}>
            {user?.matches?.map((item, index) => (
              <div className={styles.entry} key={item.id}>
                <div className={styles.count}>{index + 1}.</div>
                <div className={styles.historyContent}>
                  <span className={item.user ? styles.verified : ''}>
                    {item.user?.username ?? item.nickname ?? 'Guest'}
                  </span>
                </div>
                <div className={styles.timestamp}>
                  {formatTime(item.created_at)}
                </div>
                <div className={styles.item}>{item.accuracy} %</div>
                <div className={styles.item}>{item.wpm}</div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.pagination}>
          <button
            className={styles.pageButton}
            onClick={() => fetchMatches(1)}
            type="button"
          >
            1
          </button>
          <button
            className={styles.pageButton}
            onClick={() => fetchMatches(user?.matchPage - 1)}
            type="button"
          >{`<`}</button>
          <span>{user?.matchPage}</span>
          <button
            className={styles.pageButton}
            onClick={() => fetchMatches(user?.matchPage + 1)}
            type="button"
          >{`>`}</button>
          <button
            className={styles.pageButton}
            onClick={() => fetchMatches(user?.matchMaxPage)}
            type="button"
          >
            {user?.matchMaxPage}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
