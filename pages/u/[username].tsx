import { useRouter } from 'next/router';
import React from 'react';
import Profile from '../../components/Account/Profile';
import Layout from '../../components/Shared/Layout';

const ProfileContainer = () => {
  const { username } = useRouter().query;

  return (
    <Layout striped>
      <Profile username={username as string} />
    </Layout>
  );
};

export default ProfileContainer;
