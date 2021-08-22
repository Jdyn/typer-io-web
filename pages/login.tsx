import Layout from '../components/Layout';
import AccountAuth from '../components/Account/Auth';

const LoginContainer = (): JSX.Element => {
  return (
    <Layout striped title="Log In | Existing Account">
      <AccountAuth type="signin" />
    </Layout>
  );
};

export default LoginContainer;
