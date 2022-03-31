import Head from 'next/head';
import { ReactNode, useEffect } from 'react';
import ReactGA from 'react-ga4';

import Footer from '../Footer';
import Header from '../Header';
import styles from './index.module.css';

interface Props {
  children?: ReactNode;
  striped?: boolean;
}

const Layout = (props: Props): JSX.Element => {
  const { children, striped } = props;

  useEffect(() => {
    ReactGA.send('pageview');
  }, [children]);

  return (
    <>
      <Header />
      {striped && <div className={styles.stripe} />}
      {children}
      <Footer />
    </>
  );
};

Layout.defaultProps = {
  children: null,
  striped: false
};

export default Layout;
