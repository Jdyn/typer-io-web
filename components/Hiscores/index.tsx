import React, { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import styles from './index.module.css';
import { fetchUserHiscores } from '../../store/hiscores/actions';
import { AppState } from '../../store';
import Paper from '../Shared/Paper';
import snakeToCamel from '../../util/snakeToCamel';

const filterItems = {
  top_matches: {
    title: 'Top Matches',
    query: 'top_matches',
    fields: [{ name: 'Matches', key: 'matchCount' }]
  },
  top_speed: {
    title: 'Top Speed',
    query: 'top_speed',
    fields: [{ name: 'Top WPM', key: 'topWpm' }]
  }
};

const Hiscores = (): JSX.Element => {
  const router = useRouter();
  const { page, query } = router.query;
  const dispatch = useDispatch();
  const [filters, setFilters] = useState(filterItems[query as string] || {});
  const itemPage = useSelector(
    (state: AppState) => state.hiscores[snakeToCamel((query as string) || '')]
  );

  useEffect(() => {
    if (router.isReady) {
      dispatch(
        fetchUserHiscores((query as string).toUpperCase(), page as string)
      );

      setFilters(filterItems[query as string]);
    }
  }, [dispatch, page, query, router.isReady]);

  const setPage = (index: number): void => {
    if (index <= itemPage?.maxPage && index >= 1 && index !== itemPage?.page) {
      router.push(`/hiscores?query=${query}&page=${index}`);
    }
  };

  const changePage = (query: string, key: string) => {
    router.push(`/hiscores?query=${query}&page=${1}`);
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
        {Object.keys(filterItems).map((key) => {
          const item = filterItems[key];
          return (
            <button
              type="button"
              key={item.title}
              className={styles.filterItem}
              onClick={() => changePage(item.query, key)}
            >
              <h3>{item.title}</h3>
            </button>
          );
        })}
      </div>
      <section className={styles.hiscores}>
        <Paper title={filters.title}>
          <div className={styles.header}>
            <div className={`${styles.count} ${styles.headerItem}`}>#</div>
            <div className={`${styles.content} ${styles.headerItem}`}>Name</div>
            {filters?.fields?.map((field) => (
              <div key={field.key} className={styles.headerItem}>
                {field.name}
              </div>
            ))}
          </div>
          <div className={styles.container}>
            <div className={styles.wrapper}>
              {itemPage?.users?.map((item, index) => (
                <div className={styles.entry} key={item.id}>
                  <div className={styles.count}>
                    {itemPage.page > 1 ? (
                      <span>{50 * (itemPage?.page - 1) + index + 1}</span>
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <div className={styles.content}>
                    <span className={styles.verified}>
                      <Link href={`/u/${item.username}`}>
                        <a className={styles.nameLink}>{item.username}</a>
                      </Link>
                    </span>
                    {renderBadge(item)}
                  </div>
                  {filters?.fields?.map((field) => (
                    <div key={field.key}>{item[field.key]}</div>
                  ))}
                </div>
              ))}
            </div>
            <div className={styles.pagination}>
              <button
                className={styles.pageButton}
                onClick={() => setPage(1)}
                type="button"
              >
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
              <button
                className={styles.pageButton}
                onClick={() => setPage(itemPage?.maxPage)}
                type="button"
              >
                {itemPage?.maxPage || 1}
              </button>
            </div>
          </div>
        </Paper>
      </section>
    </div>
  );
};

export default Hiscores;
