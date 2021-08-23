import { useRouter } from 'next/router';
import React from 'react';
import Profile from '../../components/Account/Profile';
import Layout from '../../components/Layout';

const ProfileContainer = () => {
  const router = useRouter();
  const { username } = router.query;

  if (typeof username === 'undefined') return null;

  return (
    <Layout striped title={`Profile - ${username as string}`}>
      <Profile username={username as string} />
    </Layout>
  );
};

export default ProfileContainer;
