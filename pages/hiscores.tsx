import { ReactNode } from 'react';
import Layout from '../components/Shared/Layout';
import Home from '../components/Home';
import Hiscores from '../components/Hiscores';

interface Props {
  children?: ReactNode;
}

const HiscoresContainer = (_props: Props): JSX.Element => {
  return (
    <Layout striped>
      <Hiscores />
    </Layout>
  );
};

export default HiscoresContainer;
