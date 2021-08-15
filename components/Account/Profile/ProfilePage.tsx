import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Banner from '../../Shared/Banner';
import styles from './index.module.css';
import ApiService from '../../../services/api';
import formatTime from '../../../util/formatTime';
import Button from '../../Shared/Button';
import { AppState } from '../../../store';
import MiniListPost from '../../Home/RecentPosts/MiniListPost';
import { ProfileUser } from '../../../store/session/types';

interface Props {
  username: string;
}

const ProfilePage = (props: Props): JSX.Element => {
  const { username } = props;

  const [user, set] = useState<ProfileUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const sessionUser = useSelector((state: AppState) => state.session.user);

  useEffect(() => {
    if (username) {
      setError(null);
      ApiService.fetch(`/user/${username}`).then((response) => {
        if (response.ok) {
          set(response?.result?.user);
        } else {
          set(null);
          setError('This player does not exist.');
        }
      });
    }
  }, [username]);

  const fetchMatches = (page: number): void => {
    if (user && page <= user.matchMaxPage && page >= 1 && page !== user.matchPage) {
      ApiService.fetch(`/user/${username}/matches?matchPage=${page}`).then((response) => {
        if (response.ok && response.result.matches) {
          set({ ...user, ...response.result });
          const element = document.getElementById('profile-matches-wrapper');
          if (element) {
            element.scrollTop = 0;
          }
        }
      });
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.headerContainer}>
        <Banner>
          <h3>Profile</h3>
        </Banner>
        <div className={styles.profileContainer}>
          <div className={styles.wrapper}>
            <div className={styles.profilePortrait} />
            <div className={styles.content}>
              <h3>
                {user?.username} {user?.isAdmin && <span className={styles.admin}>Creator</span>}
              </h3>
              <span>{user && `Joined ${formatTime(user?.insertedAt)}`}</span>
              <div>{sessionUser?.isAdmin && `ID: ${user?.id}`}</div>
            </div>
            {user && (
              <div className={styles.bio}>
                {user.bio || "We don't know much about this person yet."}
              </div>
            )}
          </div>
          {user && user.id === sessionUser?.id && (
            <div className={styles.settings}>
              <Link href="/u/settings">
                <Button padding="6px 20px">Edit Profile</Button>
              </Link>
            </div>
          )}
          <div>{error && error}</div>
        </div>
      </div>
      <div className={styles.statsRoot}>
        <div className={styles.avgContainer}>
          <Banner>
            <h3>Averages</h3>
          </Banner>
          <div className={styles.overviewRoot}>
            <div className={styles.statItemContainer}>
              <div className={styles.statItem}>
                <div>WPM</div>
                <span>{user?.averageWpm}</span>
              </div>
              <div className={styles.statItem}>
                <div>Accuracy</div>
                <span>{user?.averageAccuracy}%</span>
              </div>
              <div className={styles.statItem}>
                <div>Errors Per Game</div>
                <span>{user?.averageErrors}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.statsContainer}>
          <Banner>
            <h3>Stats</h3>
          </Banner>
          <div className={styles.overviewRoot}>
            <div className={styles.statItemContainer}>
              <div className={styles.statItem}>
                <div>Highest WPM</div>
                <span>{user?.topWpm}</span>
              </div>
              <div className={styles.statItem}>
                <div>Games Won</div>
                <span>{user?.totalWins}</span>
              </div>
              <div className={styles.statItem}>
                <div>Games Played</div>
                <span>{user?.matchCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.about}>
        <Banner>
          <h3>About</h3>
        </Banner>
        <div className={styles.overviewRoot}>
          <div className={styles.statItemContainer}>
            <div className={styles.statItem}>
              <div>Country</div>
              <span>{user?.country || 'Not set'}</span>
            </div>
            <div className={styles.statItem}>
              <div>Age</div>
              <span>{user?.age || 'Not set'}</span>
            </div>
            <div className={styles.statItem}>
              <div>Gender</div>
              <span>{user?.gender || 'Not set'}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.friendsList}>
        <Banner>
          <h3>Posts</h3>
        </Banner>
        <div className={styles.friendsListWrapper}>
          {user && user.posts.length > 0 ? (
            user?.posts.map((post) => <MiniListPost key={post.id} post={post} />)
          ) : (
            <>{user && <span>{user?.username} has not created any posts.</span>}</>
          )}
        </div>
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
          <div id="profile-matches-wrapper" className={styles.historyWrapper}>
            {user?.matches?.map((item, index) => (
              <div className={styles.entry} key={item.id}>
                <div className={styles.count}>
                  {user?.matchPage > 1 ? (
                    <span>{25 * (user?.matchPage - 1) + index + 1}</span>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                  .
                </div>
                <div className={styles.historyContent}>
                  <span className={item.user ? styles.verified : ''}>
                    {item.user?.username ?? item.nickname ?? 'Guest'}
                  </span>
                </div>
                <div className={styles.timestamp}>{formatTime(item.created_at)}</div>
                <div className={styles.item}>{item.accuracy} %</div>
                <div className={styles.item}>{item.wpm}</div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.pagination}>
          <button className={styles.pageButton} onClick={() => fetchMatches(1)} type="button">
            1
          </button>
          <button
            className={styles.pageButton}
            onClick={() => user && fetchMatches(user.matchPage - 1)}
            type="button"
          >{`<`}</button>
          <span>{user?.matchPage}</span>
          <button
            className={styles.pageButton}
            onClick={() => user && fetchMatches(user.matchPage + 1)}
            type="button"
          >{`>`}</button>
          <button
            className={styles.pageButton}
            onClick={() => user && fetchMatches(user.matchMaxPage)}
            type="button"
          >
            {user?.matchMaxPage || 1}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
