import React, { ReactNode, useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import styles from './index.module.css';
import { fetchUserHiscores } from '../../store/hiscores/actions';
import { AppState } from '../../store';
import Paper from '../Shared/Paper';
import formatTime from '../../util/formatTime';
import snakeToCamel from '../../util/snakeToCamel';

const Hiscores = (): JSX.Element => {
  const router = useRouter();
  const { page, query } = router.query;
  const dispatch = useDispatch();
  const itemPage = useSelector(
    (state: AppState) => state.hiscores[snakeToCamel((query as string) || '')]
  );

  const session = useSelector((state: AppState) => state.session);

  useEffect(() => {
    if (router.isReady) {
      dispatch(
        fetchUserHiscores((query as string).toUpperCase(), page as string)
      );
    }
  }, [dispatch, page, query, router.isReady]);

  const setPage = (index: number): void => {
    if (
      index <= itemPage?.postMaxPage &&
      index >= 1 &&
      index !== itemPage?.postPage
    ) {
      router.push(`/hiscores?query=${query}&page=${index}`);
    }
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
      <section className={styles.hiscores}>
        <Paper title="Top Matches">
          <div className={styles.header}>
            <div className={`${styles.count} ${styles.headerItem}`}>#</div>
            <div className={`${styles.content} ${styles.headerItem}`}>Name</div>
            <div className={styles.headerItem}>Matches</div>
          </div>
          <div className={styles.container}>
            <div className={styles.wrapper}>
              {itemPage?.users?.map((item, index) => (
                <div className={styles.entry} key={item.id}>
                  <div className={styles.count}>{index + 1}.</div>
                  <div className={styles.content}>
                    <span className={styles.verified}>
                      <Link href={`/u/${item.username}`}>
                        <a className={styles.nameLink}>{item.username}</a>
                      </Link>
                    </span>
                    {renderBadge(item)}
                  </div>
                  <div>{item.matchCount}</div>
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
