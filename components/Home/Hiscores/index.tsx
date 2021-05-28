import { useEffect, useState, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import styles from './index.module.css';
import Paper from '../../Shared/Paper';
import { fetchHiscores } from '../../../store/hiscores/actions';
import Filter from '../../Shared/Filter';
import { HiscoreQueryTypes } from '../../../store/hiscores/types';
import formatTime from '../../../util/formatTime';
import { AppState } from '../../../store';

interface Props {
  children?: ReactNode;
}

const filters = [
  { name: 'daily', key: 'DAY' },
  { name: 'weekly', key: 'WEEK' },
  { name: 'monthly', key: 'MONTH' },
  { name: 'all time', key: 'ALL' }
];

const Hiscores = (_props: Props): JSX.Element => {
  const [filterIndex, setFilterIndex] = useState(0);
  const dispatch = useDispatch();
  const request = useSelector((state: AppState) => state.request);
  const hiscores = useSelector(
    (state: AppState) => state.hiscores[filters[filterIndex].key.toLowerCase()]
  );
  const session = useSelector((state: AppState) => state.session);

  useEffect(() => {
    const query = filters[filterIndex].key;

    if (!request[`FETCH_HISCORES_${query}`] || request.FETCH_HISCORES_RECENT) {
      dispatch(fetchHiscores(query as HiscoreQueryTypes));
    }
  }, [dispatch, filterIndex, request]);

  const renderBadge = (user): ReactNode => {
    if (user) {
      if (user.isAdmin) {
        return <span className={styles.admin}>Creator</span>;
      }
    }

    return null;
  };

  return (
    <section className={styles.root}>
      <Paper title="Hiscores">
        <Filter
          onClick={(index): void => setFilterIndex(index)}
          filters={filters}
          selectedIndex={filterIndex}
        />
        <div className={styles.header}>
          <div className={`${styles.count} ${styles.headerItem}`}>#</div>
          <div className={`${styles.content} ${styles.headerItem}`}>Name</div>
          <div className={styles.timestamp}>Date</div>
          <div className={styles.item}>Accuracy</div>
          <div className={styles.item}>WPM</div>
        </div>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            {hiscores.map((item, index) => (
              <div className={styles.entry} key={item.id}>
                <div className={styles.count}>{index + 1}.</div>
                <div className={styles.content}>
                  <span className={item.user ? styles.verified : ''}>
                    {item.user?.username ? (
                      <Link href={`/u/${item.user.username}`}>
                        <a className={styles.nameLink}>{item.user?.username}</a>
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
                <div className={styles.item}>{item.accuracy} %</div>
                <div className={styles.item}>
                  {item.wpm}{' '}
                  {session.user?.isAdmin && <span>{`(${item.id})`}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Paper>
    </section>
  );
};

export default Hiscores;
