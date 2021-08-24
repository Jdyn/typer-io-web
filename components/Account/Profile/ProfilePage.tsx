import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Banner from '../../Shared/Banner';
import styles from './index.module.css';
import formatTime from '../../../util/formatTime';
import Button from '../../Shared/Button';
import { AppState } from '../../../store';
import MiniListPost from '../../Home/RecentPosts/MiniListPost';
import { useGetMatchesQuery, useGetUserQuery } from '../../../services/account';
import { ApiErrorResponse } from '../../../services/types';

interface Props {
  username: string;
}

const ProfilePage = (props: Props): JSX.Element => {
  const { username } = props;
  const router = useRouter();
  const { matchPage } = router.query;

  const { data: user, isError, error } = useGetUserQuery(username);
  const { data: matches } = useGetMatchesQuery({ username, matchPage: matchPage || '1' });
  const sessionUser = useSelector((state: AppState) => state.session.user);

  const fetchMatches = (page: number): void => {
    if (matches && page <= matches.totalPages && page >= 1 && page !== matches.page) {
      router.push(`/u/${user.username}?matchPage=${page}`, null, {
        scroll: false
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
              <div>{isError && (error as ApiErrorResponse).data.error}</div>
            </div>
            <div className={styles.aboutContainer}>
              <h3>About</h3>
              {user?.country && (
                <div className={styles.statItem}>
                  <div>Country</div>
                  <span>{user?.country || 'Not set'}</span>
                </div>
              )}
              {user?.age && (
                <div className={styles.statItem}>
                  <div>Age</div>
                  <span>{user?.age || 'Not set'}</span>
                </div>
              )}
              {user?.gender && (
                <div className={styles.statItem}>
                  <div>Gender</div>
                  <span>{user?.gender || 'Not set'}</span>
                </div>
              )}
            </div>

            {user && (
              <div className={styles.bio}>
                {user?.bio || "We don't know much about this person yet."}
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
        </div>
      </div>
      <div className={styles.statsContainer}>
        <Banner>
          <h3>Overview</h3>
        </Banner>
        <div className={styles.overviewRoot}>
          <div className={styles.statItemContainer}>
            <h3>Averages</h3>
            <div className={styles.statItem}>
              <div>WPM</div>
              <span>{user?.averageWpm}</span>
            </div>
            <div className={styles.statItem}>
              <div>Accuracy</div>
              <span>{user?.averageAccuracy && `${user?.averageAccuracy}%`}</span>
            </div>
            <div className={styles.statItem}>
              <div>Errors Per Game</div>
              <span>{user?.averageErrors}</span>
            </div>
          </div>
          <div className={styles.statItemContainer}>
            <h3>Records</h3>
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
            {matches?.data?.map((item, index) => (
              <div className={styles.entry} key={item.id}>
                <div className={styles.count}>
                  {matches?.page > 1 ? (
                    <span>{25 * (matches?.page - 1) + index + 1}</span>
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
          <button
            className={styles.pageButton}
            onClick={() => matches && fetchMatches(1)}
            type="button"
          >
            1
          </button>
          <button
            className={styles.pageButton}
            onClick={() => matches && fetchMatches(matches.page - 1)}
            type="button"
          >{`<`}</button>
          <span>{matches?.page}</span>
          <button
            className={styles.pageButton}
            onClick={() => matches && fetchMatches(matches.page + 1)}
            type="button"
          >{`>`}</button>
          <button
            className={styles.pageButton}
            onClick={() => matches && fetchMatches(matches.totalPages)}
            type="button"
          >
            {matches?.totalPages || 1}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
