import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Hiscores from '../components/Hiscores';

const HiscoresContainer = (): JSX.Element => {
  const router = useRouter();
  const { query } = router.query;

  if (query === undefined) return null;

  return (
    <Layout striped title="Hiscores | Competitive leaderboards">
      <Hiscores />
    </Layout>
  );
};

export default HiscoresContainer;
