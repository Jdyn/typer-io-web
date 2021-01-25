import Layout from '../../../components/Shared/Layout';
import CreatePost from '../../../components/Forum/CreatePost';

const CreatePostPage = (): JSX.Element => {
  return (
    <>
      <Layout striped>
        <CreatePost />
      </Layout>
    </>
  );
};

export default CreatePostPage;
