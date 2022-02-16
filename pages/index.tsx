import Home from '../components/Home';
import Layout from '../components/Layout';

const HomeContainer = (): JSX.Element => {
  return (
    <Layout
      striped
      title="Home | The Modern Multiplayer Typing Experience"
      description="Typer is a fast and modern multiplayer typing competition. Type against your friends in large 50+ player matches within a few clicks."
    >
      <Home />
    </Layout>
  );
};

export default HomeContainer;
