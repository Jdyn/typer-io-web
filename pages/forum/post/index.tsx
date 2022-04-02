import Layout from '../../../components/Layout';
import CreatePost from '../../../app/Forum/CreatePost';

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
