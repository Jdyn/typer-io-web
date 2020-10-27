import Layout from '../components/Layout';
import AccountAuth from '../components/Account/Auth';

interface Props {
  children?: React.ReactNode;
}

const LoginContainer = (_props: Props): JSX.Element => {
  return (
    <Layout striped>
      <AccountAuth type="login" />
    </Layout>
  );
};

export default LoginContainer;
