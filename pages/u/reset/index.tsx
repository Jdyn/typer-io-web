import React from 'react';
import Layout from '../../../components/Layout';
import ForgotAuth from '../../../components/Account/ForgotAuth';

const Forgot = (): JSX.Element => {
  return (
    <Layout striped title="Forgot Password">
      <ForgotAuth />
    </Layout>
  );
};

export default Forgot;
