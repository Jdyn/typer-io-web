import React, { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import styles from './index.module.css';
import Paper from '../Shared/Paper';
import IFilter from '../Shared/Filter';
import formatTime from '../../util/formatTime';
import { useGetUserHiscoresQuery } from '../../services/hiscores';
import Paginate from '../Shared/Paginate';
import useNextQueryParams from '../../util/useNextQueryParam';

const Adsense = dynamic(() => import('../Shared/Adsense'), {
  ssr: false
});

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
  const { page, query, type } = useNextQueryParams();
  const [board, setBoard] = useState(leaderboards[query as string] || {});

  const { data: itemPage } = useGetUserHiscoresQuery({ query, page, type });

  useEffect(() => {
    if (router.isReady) {
      setBoard(leaderboards[query as string]);

      if (!type) {
        router.push(`/hiscores?query=${query}&page=${1}&type=all`);
      }
    }
  }, [page, query, router, type]);

  const setPage = (index, newType?: string): void => {
    router.push(`/hiscores?query=${query}&page=${index}&type=${newType || type}`, null, {
      scroll: false
    });
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
      <Adsense
        client="ca-pub-3148839588626786"
        slot="1319118588"
        style={{ display: 'block' }}
        format="auto"
      />
      <section className={styles.hiscores}>
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

        <Paper title={`${board.title} ${`- ${type} quotes`}`}>
          <Paginate defaultPage={parseInt(page, 10)} pageUpdated={setPage} />
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
                  className={styles.entry}
                  key={item.username || item.user?.username}
                  href={`/u/${item.username || item.user?.username}`}
                >
                  <div className={styles.count}>
                    {itemPage.page > 1 ? (
                      <span>{itemPage?.data.length * (itemPage?.page - 1) + index + 1}</span>
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <div className={styles.name}>
                    {item.username || item.user?.username}
                    {renderBadge(item)}
                  </div>
                  {board?.fields?.map((field) => (
                    <div key={field.key} className={styles.content}>
                      {field.key === 'createdAt' ? formatTime(item[field.key]) : item[field.key]}
                    </div>
                  ))}
                </Link>
              ))}
            </div>
            <Paginate defaultPage={parseInt(page, 10)} pageUpdated={setPage} />
          </div>
        </Paper>
      </section>
      <Adsense
        client="ca-pub-3148839588626786"
        slot="1319118588"
        style={{ display: 'block' }}
        format="auto"
      />
    </div>
  );
};

export default Hiscores;
