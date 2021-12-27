import { useRouter } from 'next/router';
import Search from '../../components/Account/Search/Search';
import Layout from '../../components/Layout';
import { useSearchUserQuery } from '../../services/account';

const SearchContainer = (): JSX.Element => {
  const router = useRouter();
  const { user } = router.query;

  const { data: userPage } = useSearchUserQuery({ username: user as string });

  return (
    <Layout striped title={`Player Search | ${user}`}>
      <Search />
    </Layout>
  );
};

export default SearchContainer;
