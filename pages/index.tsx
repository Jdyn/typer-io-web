import { ReactNode } from 'react';
import Layout from '../components/Shared/Layout';
import Home from '../components/Home';

interface Props {
  children?: ReactNode;
}

const HomeContainer = (_props: Props): JSX.Element => {
  return (
    <Layout striped title="Home | The Modern Multiplayer Typing Experience">
      <Home />
    </Layout>
  );
};

export default HomeContainer;
