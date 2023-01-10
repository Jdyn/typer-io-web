import { useRouter } from 'next/router';
import Search from '../../components/Account/Search';
import Layout from '../../components/Layout';

const SearchContainer = (): JSX.Element => {
  const { term, page } = useRouter().query;

  return (
    <Layout striped title={`Player Search | ${term}`}>
      {term && <Search term={term} page={page} />}
    </Layout>
  );
};

export default SearchContainer;
