import React from 'react';
import Layout from '../../../components/Layout';
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
