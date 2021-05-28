import Layout from '../components/Layout';
import Hiscores from '../components/Hiscores';

const HiscoresContainer = (): JSX.Element => {
  return (
    <Layout striped title="Hiscores | Competitive leaderboards">
      <Hiscores />
    </Layout>
  );
};

export default HiscoresContainer;
