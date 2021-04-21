import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import styles from './index.module.css';
import { fetchUserHiscores } from '../../store/hiscores/actions';
import { AppState } from '../../store';
import Paper from '../Shared/Paper';

const Hiscores = (): JSX.Element => {
  const router = useRouter();
  const dispatch = useDispatch();
  const itemPage = useSelector((state: AppState) => state.hiscores.topMatches);
  // const session = useSelector((state: AppState) => state.session);
  const { page, query } = router.query;

  useEffect(() => {
    if (router.isReady) {
      console.log(page);
      console.log(query);
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

  return (
    <div className={styles.root}>
      <Paper title="Hiscores">
        <div className={styles.wrapper}>
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
              {page?.maxPage || 1}
            </button>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Hiscores;
