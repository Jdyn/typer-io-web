import React from 'react';
import ProfileSettingsPage from '../../components/Account/Profile/Settings';
import Layout from '../../components/Layout';
import PrivateRoute from '../../components/Shared/PrivateRoute';

const ProfileSettings = () => {
  return (
    <Layout striped>
      <ProfileSettingsPage />
    </Layout>
  );
};

export default PrivateRoute(ProfileSettings);
