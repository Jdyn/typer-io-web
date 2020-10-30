import Layout from '../../components/Layout';
import Forum from '../../components/Forum';

const ForumPage = (_props): JSX.Element => {
  return (
    <>
      <Layout striped>
        <Forum />
      </Layout>
    </>
  );
};

export default ForumPage;
