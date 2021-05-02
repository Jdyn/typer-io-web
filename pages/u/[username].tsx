import { useRouter } from 'next/router';
import React from 'react';
import Profile from '../../components/Account/Profile';
import Layout from '../../components/Layout';

const ProfileContainer = () => {
  const { username } = useRouter().query;

  return (
    <Layout striped title={`Profile - ${username as string}`}>
      <Profile username={username as string} />
    </Layout>
  );
};

export default ProfileContainer;
