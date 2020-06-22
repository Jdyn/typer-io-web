import React from 'react';
import Layout from '../components/Layout';
import Home from '../components/Home';

interface Props {
  children?: React.ReactNode;
}

const Index = (_props: Props): JSX.Element => {
  return (
    <Layout striped>
      <Home />
    </Layout>
  );
};

export default Index;
