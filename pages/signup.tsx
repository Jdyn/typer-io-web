import React from 'react';
import Layout from '../components/Layout';
import AccountAuth from '../components/Account/Auth';

interface Props {
  children?: React.ReactNode;
}

const SignupContainer = (_props: Props): JSX.Element => {
  return (
    <Layout striped>
      <AccountAuth type="signup" />
    </Layout>
  );
};

export default SignupContainer;
