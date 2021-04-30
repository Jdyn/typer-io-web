import { ReactNode } from 'react';
import Layout from '../components/Shared/Layout';
import Hiscores from '../components/Hiscores';

interface Props {
  children?: ReactNode;
}

const HiscoresContainer = (_props: Props): JSX.Element => {
  return (
    <Layout striped title="Hiscores | Multiplayer leaderboards">
      <Hiscores />
    </Layout>
  );
};

export default HiscoresContainer;
