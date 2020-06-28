import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import Post from '../../../components/Forum/Post';

const PostPage = (): JSX.Element => {
  const router = useRouter();
  const { postId } = router.query;

  return (
    <>
      <Layout striped>
        <Post postId={postId as string} />
      </Layout>
    </>
  );
};

export default PostPage;
