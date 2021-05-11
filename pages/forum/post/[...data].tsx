import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import Post from '../../../components/Forum/Post';

const PostPage = (): JSX.Element => {
  const router = useRouter();
  const postData = router.query.data;

  if (typeof postData === 'undefined') return null;

  return (
    <>
      <Layout striped title={`Forum | ${postData[1] || ''}`}>
        <Post postId={postData[0]} />
      </Layout>
    </>
  );
};

export default PostPage;
