import MiniListPost from './MiniListPost';
import Paper from '../../Shared/Paper';
import Loader from '../../Shared/Loader';
import { useGetPostsQuery } from '../../../services/forum';

import styles from './index.module.css';

const RecentPosts = (): JSX.Element => {
  const { data: feed, isFetching, isError } = useGetPostsQuery({ query: 'recent' });

  return (
    <section className={styles.root}>
      <Paper title="Recent Posts">
        {feed?.data && (
          <div className={styles.container}>
            {feed.data.map((post) => (
              <MiniListPost key={post.id} post={post} />
            ))}
          </div>
        )}
        {isFetching && (
          <div className={styles.loader}>
            <Loader width="48px" height="48px" />
          </div>
        )}
        {isError && (
          <div className={styles.loader}>
            <span>Failed to load recent posts.</span>
          </div>
        )}
      </Paper>
    </section>
  );
};

export default RecentPosts;
