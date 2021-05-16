import { ReactNode } from 'react';
import Layout from '../components/Layout';
import AccountAuth from '../components/Account/Auth';

interface Props {
  children?: ReactNode;
}

const SignupContainer = (_props: Props): JSX.Element => {
  return (
    <Layout
      striped
      title="Sign up | New Account"
      description="Create an account to save match history, use the forums, and watch as you quickly improve."
    >
      <AccountAuth type="signup" />
    </Layout>
  );
};

export default SignupContainer;
