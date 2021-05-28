import Layout from '../components/Layout';
import Home from '../components/Home';

const HomeContainer = (): JSX.Element => {
  return (
    <Layout striped title="Home | The Modern Multiplayer Typing Experience">
      <Home />
    </Layout>
  );
};

export default HomeContainer;
