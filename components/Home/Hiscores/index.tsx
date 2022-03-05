import Link from 'next/link';
import { ReactNode, useState } from 'react';
import { useSelector } from 'react-redux';

import { useGetHiscoresQuery } from '../../../services/hiscores';
import { AppState } from '../../../store';
import formatTime from '../../../util/formatTime';
import IFilter from '../../Shared/Filter';
import Paper from '../../Shared/Paper';
import styles from './index.module.css';

const filters = [
  { name: 'daily', key: 'DAY' },
  { name: 'weekly', key: 'WEEK' },
  { name: 'monthly', key: 'MONTH' }
  // { name: 'all time', key: 'ALL' }
];

const Hiscores = (): JSX.Element => {
  const [filterIndex, setFilterIndex] = useState(0);
  const session = useSelector((state: AppState) => state.session);

  const { data: hiscores } = useGetHiscoresQuery(filters[filterIndex].key);

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
        <IFilter
          onClick={(index): void => setFilterIndex(index)}
          filters={filters}
          selectedIndex={filterIndex}
        />
        <div className={styles.header}>
          <div className={`${styles.count} ${styles.headerItem}`}>#</div>
          <div className={`${styles.content} ${styles.headerItem}`}>Name</div>
          <div className={`${styles.content} ${styles.item}`}>Difficulty</div>
          <div className={styles.item}>Accuracy</div>
          <div className={styles.item}>WPM</div>
        </div>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            {hiscores &&
              hiscores.map((item, index) => (
                <div className={styles.entry} key={item.id}>
                  <div className={styles.count}>{index + 1}.</div>
                  <div className={styles.content}>
                    {item.user?.username ? (
                      <Link prefetch={false} href={`/u/${item.user.username}`}>
                        <a className={styles.nameLink}>{item.user?.username}</a>
                      </Link>
                    ) : (
                      item.nickname
                    )}
                    <div className={styles.timestamp}>
                      {' '}
                      <span className={`${styles[item.difficulty]}`}>{item.difficulty}</span>,{' '}
                      {formatTime(item.created_at)}
                    </div>
                    {renderBadge(item.user)}
                  </div>
                  <div className={styles.item}>{item.accuracy}%</div>
                  <div className={styles.item}>
                    {item.wpm} {session.user?.isAdmin && <span>{`(${item.id})`}</span>}
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
