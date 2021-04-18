import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './index.module.css';
import Banner from '../Shared/Banner';
import { fetchPosts } from '../../store/forum/actions';
import { AppState } from '../../store';
import Paper from '../Shared/Paper';

const Forum = (): JSX.Element => {
  const router = useRouter();
  const dispatch = useDispatch();
  const page = useSelector((state: AppState) => state.forum.feed.page);
  const session = useSelector((state: AppState) => state.session);
  const { page: pageNumber } = router.query;

  useEffect(() => {
    if (router.isReady) {
      dispatch(fetchPosts(pageNumber as string));
    }
  }, [dispatch, pageNumber, router.isReady]);

  const setPage = (index) => {
    if (index <= page?.postMaxPage && index >= 1 && index !== page?.postPage) {
      router.push(`/forum?page=${index}`);
    }
  };

  return (
    <div className={styles.root}>
      <Paper title="Hiscores">
        <div className={styles.wrapper}>ok</div>
      </Paper>
    </div>
  );
};

export default Forum;
