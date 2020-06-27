import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './index.module.css';
import Banner from '../../Shared/Banner';
import { fetchHiscores } from '../../../store/hiscores/actions';
import Filter from '../../Shared/Filter';
import { HiscoreQueryTypes } from '../../../store/hiscores/types';
import formatTime from '../../../util/formatTime';
import { AppState } from '../../../store';

interface Props {
  children?: React.ReactNode;
}

const filters = [
  { name: 'week', key: 'WEEK' },
  { name: 'month', key: 'MONTH' },
  { name: 'all time', key: 'ALL' }
];

const Hiscores = (): JSX.Element => {
  const [filterIndex, setFilterIndex] = useState(0);
  const dispatch = useDispatch();
  const request = useSelector((state: AppState) => state.request);
  const hiscores = useSelector(
    (state: AppState) => state.hiscores[filters[filterIndex].key.toLowerCase()]
  );

  useEffect(() => {
    const query = filters[filterIndex].key;
    if (!request[`FETCH_HISCORES_${query}`]) {
      dispatch(fetchHiscores(query as HiscoreQueryTypes));
    }
  }, [filterIndex, dispatch, request]);

  return (
    <section className={styles.root}>
      <Banner>
        <h1>Hiscores</h1>
      </Banner>
      <Filter
        onClick={(index): void => setFilterIndex(index)}
        filters={filters}
        selectedIndex={filterIndex}
      />
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {hiscores.map((item, index) => (
            <div className={styles.entry} key={item.id}>
              <div className={styles.count}>{index + 1}.</div>
              <div className={styles.portrait} />
              <div className={styles.content}>
                {item.user?.username ?? item.nickname ?? 'Guest'}
              </div>
              <div className={styles.timestamp}>{formatTime(item.created_at)}</div>
              <div className={styles.item}>{item.wpm} WPM</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hiscores;
