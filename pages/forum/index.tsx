import Layout from '../../components/Layout';
import Forum from '../../components/Forum';

const ForumPage = (): JSX.Element => {
  return (
    <>
      <Layout striped title="Forums | Interact with the community">
        <Forum />
      </Layout>
    </>
  );
};

export default ForumPage;
