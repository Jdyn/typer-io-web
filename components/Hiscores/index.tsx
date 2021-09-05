import React, { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import styles from './index.module.css';
import { fetchUserHiscores } from '../../store/hiscores/actions';
import { AppState } from '../../store';
import Paper from '../Shared/Paper';
import snakeToCamel from '../../util/snakeToCamel';
import IFilter from '../Shared/Filter';
import formatTime from '../../util/formatTime';

const leaderboards = {
  top_speed: {
    title: 'Top Speed',
    query: 'top_speed',
    fields: [
      { name: 'Date', key: 'createdAt' },
      { name: 'Top WPM', key: 'wpm' }
    ],
    filters: [
      { name: 'all', key: 'all' },
      { name: 'easy', key: 'easy' },
      { name: 'medium', key: 'medium' },
      { name: 'hard', key: 'hard' }
    ]
  },
  top_matches: {
    title: 'Top Matches',
    query: 'top_matches',
    fields: [{ name: 'Matches', key: 'matchCount' }],
    filters: [
      { name: 'all', key: 'all' },
      { name: 'easy', key: 'easy' },
      { name: 'medium', key: 'medium' },
      { name: 'hard', key: 'hard' }
    ]
  }
};

const Hiscores = (): JSX.Element => {
  const router = useRouter();
  const { page, query, type } = router.query;
  const dispatch = useDispatch();
  const [board, setBoard] = useState(leaderboards[query as string] || {});
  const itemPage = useSelector(
    (state: AppState) => state.hiscores[snakeToCamel((query as string) || '')]
  );

  useEffect(() => {
    if (router.isReady) {
      dispatch(fetchUserHiscores((query as string).toUpperCase(), page as string, type));

      setBoard(leaderboards[query as string]);

      if (!type) {
        router.push(`/hiscores?query=${query}&page=${1}&type=all`);
      }
    }
  }, [dispatch, page, query, router, router.isReady, type]);

  const setPage = (index, newType?: string): void => {
    // if (index <= itemPage?.maxPage && index >= 1 && index !== itemPage?.page) {
    router.push(`/hiscores?query=${query}&page=${index}&type=${newType || type}`);
    // }
  };

  const changePage = (itemQuery: string) => {
    router.push(`/hiscores?query=${itemQuery}&page=${1}&type=${type || 'all'}`);
  };

  const renderBadge = (user): ReactNode => {
    if (user) {
      if (user.isAdmin) {
        return <span className={styles.admin}>Creator</span>;
      }
    }

    return null;
  };

  return (
    <div className={styles.root}>
      <div className={styles.filter}>
        {Object.keys(leaderboards).map((key) => {
          const item = leaderboards[key];
          return (
            <button
              type="button"
              key={item.title}
              className={styles.filterItem}
              onClick={() => changePage(item.query)}
            >
              <h3>{item.title}</h3>
            </button>
          );
        })}
      </div>
      <section className={styles.hiscores}>
        <Paper title={`${board.title} ${`- ${type} quotes`}`}>
          <div className={styles.pagination}>
            <button className={styles.pageButton} onClick={() => setPage(1)} type="button">
              1
            </button>
            <button
              className={styles.pageButton}
              onClick={() => setPage(itemPage?.page - 1)}
              type="button"
            >{`<`}</button>
            <span>{itemPage?.page}</span>
            <button
              className={styles.pageButton}
              onClick={() => setPage(itemPage?.page + 1)}
              type="button"
            >{`>`}</button>
            {itemPage?.maxPage && (
              <button
                className={styles.pageButton}
                onClick={() => setPage(itemPage?.maxPage)}
                type="button"
              >
                {itemPage?.maxPage || 1}
              </button>
            )}
          </div>
          {board.filters && (
            <IFilter
              selectedFilter={type as string}
              filters={board.filters || []}
              onClick={(_index, filter) => setPage(page, filter.name)}
            />
          )}
          <div className={styles.header}>
            <div className={`${styles.count} ${styles.headerItem}`}>#</div>
            <div className={`${styles.name} ${styles.headerItem}`}>Name</div>
            {board?.fields?.map((field) => (
              <div key={field.key} className={styles.content}>
                {field.name}
              </div>
            ))}
          </div>
          <div className={styles.container}>
            <div className={styles.wrapper}>
              {itemPage?.data?.map((item, index) => (
                <Link
                  key={item.username || item.user?.username}
                  href={`/u/${item.username || item.user?.username}`}
                >
                  <div className={styles.entry}>
                    <div className={styles.count}>
                      {itemPage.page > 1 ? (
                        <span>{itemPage?.data.length * (itemPage?.page - 1) + index + 1}</span>
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                    <div className={styles.name}>
                      <span className={styles.verified}>
                        {item.username || item.user?.username}
                      </span>
                      {renderBadge(item)}
                    </div>
                    {board?.fields?.map((field) => (
                      <div key={field.key} className={styles.content}>
                        {field.key === 'createdAt' ? formatTime(item[field.key]) : item[field.key]}
                      </div>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
            <div className={styles.pagination}>
              <button className={styles.pageButton} onClick={() => setPage(1)} type="button">
                1
              </button>
              <button
                className={styles.pageButton}
                onClick={() => setPage(itemPage?.page - 1)}
                type="button"
              >{`<`}</button>
              <span>{itemPage?.page}</span>
              <button
                className={styles.pageButton}
                onClick={() => setPage(itemPage?.page + 1)}
                type="button"
              >{`>`}</button>
              {itemPage?.maxPage && (
                <button
                  className={styles.pageButton}
                  onClick={() => setPage(itemPage?.maxPage)}
                  type="button"
                >
                  {itemPage?.maxPage || 1}
                </button>
              )}
            </div>
          </div>
        </Paper>
      </section>
    </div>
  );
};

export default Hiscores;
