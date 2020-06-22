import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import styles from './index.module.css';

interface Props {
  children?: React.ReactNode;
  striped?: boolean;
}

const Layout = (props: Props): JSX.Element => {
  const { children, striped } = props;
  return (
    <>
      <Header />
      {striped && <div className={styles.stripe} />}
      {children}
      <Footer />
    </>
  );
};

export default Layout;
