import { useRouter } from 'next/router';
import Search from '../../components/Account/Search/Search';
import Layout from '../../components/Layout';

const SearchContainer = (): JSX.Element => {
  const router = useRouter();
  const { user } = router.query;

  return (
    <Layout striped title={`Player Search | ${user}`}>
      <Search />
    </Layout>
  );
};

export default SearchContainer;
