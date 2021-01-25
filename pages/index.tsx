import Layout from '../components/Shared/Layout';
import Home from '../components/Home';

interface Props {
  children?: React.ReactNode;
}

const HomeContainer = (_props: Props): JSX.Element => {
  return (
    <Layout striped>
      <Home />
    </Layout>
  );
};

export default HomeContainer;
