import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { useGetMatchesQuery, useGetUserQuery } from '../../../services/account';
import { useGetUserRecordsQuery } from '../../../services/hiscores';
import { ApiErrorResponse } from '../../../services/types';
import { AppState } from '../../../store';
import formatTime from '../../../util/formatTime';
import MiniListPost from '../../Home/RecentPosts/MiniListPost';
import Banner from '../../Shared/Banner';
import Button from '../../Shared/Button';
import Paginate from '../../Shared/Paginate';
import Paper from '../../Shared/Paper';
import styles from './index.module.css';

interface Props {
  username: string;
}

const ProfilePage = (props: Props): JSX.Element => {
  const { username } = props;
  const router = useRouter();
  const { matchPage } = router.query;

  const { data: user, isError, error } = useGetUserQuery(username);
  const { data: matches } = useGetMatchesQuery({ userId: user?.id, matchPage: matchPage || '1' });
  const { data: records } = useGetUserRecordsQuery({ username });
  const sessionUser = useSelector((state: AppState) => state.session.user);

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
              <div>{isError && (error as ApiErrorResponse)?.data?.error}</div>
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
            <Link href="/u/settings" className={styles.settings}>
              <Button padding="6px 20px">Edit Profile</Button>
            </Link>
          )}
        </div>
      </div>
      <div className={styles.statsContainer}>
        <Banner>
          <h3>Overview</h3>
        </Banner>
        <div className={styles.overviewRoot}>
          <div className={styles.statItemContainer} style={{ flex: 1 }}>
            <h3>Averages (Recent 25)</h3>
            <div className={styles.statItem}>
              <div>WPM</div>
              <span>{user?.recentAverageWpm}</span>
            </div>
            <div className={styles.statItem}>
              <div>Accuracy</div>
              <span>{user?.recentAverageAccuracy && `${user?.recentAverageAccuracy}%`}</span>
            </div>
            <div className={styles.statItem}>
              <div>Errors Per Game</div>
              <span>{user?.recentAverageErrors}</span>
            </div>
          </div>
          <div className={styles.statItemContainer} style={{ flex: 1 }}>
            <h3>Averages (all time)</h3>
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
            <div className={styles.statItemWrapper}>
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
      <section className={styles.right}>
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
        <Paper title="Records">
          <div className={styles.recordsContainer}>
            <div className={styles.recordsWrapper}>
              {records &&
                records.map((record, index) => (
                  <div className={styles.matchEntry} key={record.id}>
                    <div className={styles.count}>{index + 1}.</div>
                    <div className={styles.matchContent} style={{ flex: '4' }}>
                      <div>{record.snippetTitle}</div>
                      <div className={styles.matchTimestamp}>
                        {' '}
                        <span className={`${styles[record.difficulty]}`}>
                          {record.difficulty}
                        </span>, {formatTime(record.created_at)}
                      </div>
                    </div>
                    <div className={styles.matchItem}>{record.wpm} WPM</div>
                  </div>
                ))}
            </div>
          </div>
        </Paper>
      </section>
      <section className={styles.matchRoot}>
        <Paper title="Matches">
          <div className={styles.matchHeader}>
            <div className={`${styles.count} ${styles.matchHeaderItem}`}>#</div>
            <div className={`${styles.matchContent} ${styles.matchHeaderItem}`}>Name</div>
            <div className={styles.matchItem}>Accuracy</div>
            <div className={styles.matchItem}>WPM</div>
          </div>
          <div className={styles.matchContainer}>
            <div className={styles.matchWrapper}>
              {matches &&
                matches.data.map((item, index) => (
                  <div className={styles.matchEntry} key={item.id}>
                    <div className={styles.count}>
                      {matches?.page > 1 ? (
                        <span>{25 * (matches?.page - 1) + index + 1}</span>
                      ) : (
                        <span>{index + 1}</span>
                      )}
                      .
                    </div>
                    <div className={styles.matchContent}>
                      <div>{item.snippetTitle}</div>
                      <div className={styles.matchTimestamp}>
                        {' '}
                        <span className={`${styles[item.difficulty]}`}>
                          {item.difficulty}
                        </span>, {formatTime(item.created_at)}
                      </div>
                    </div>
                    <div className={styles.matchItem}>{item.accuracy}%</div>
                    <div className={styles.matchItem}>
                      {item.wpm} {sessionUser?.isAdmin && <div>{item.id}</div>}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <Paginate
            pageUpdated={(newPage) =>
              router.push(`/u/${user.username}?matchPage=${newPage}`, null, {
                scroll: false
              })
            }
            totalPages={matches?.totalPages}
          />
        </Paper>
      </section>
    </div>
  );
};

export default ProfilePage;
