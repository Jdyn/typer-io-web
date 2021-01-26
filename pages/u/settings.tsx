import React from 'react';
import ProfileSettings from '../../components/Account/Settings';
import Layout from '../../components/Shared/Layout';
import PrivateRoute from '../../components/Shared/PrivateRoute';

const ProfileSettingsPage = () => {
  return (
    <Layout>
      <ProfileSettings />
    </Layout>
  );
};

export default PrivateRoute(ProfileSettingsPage);
