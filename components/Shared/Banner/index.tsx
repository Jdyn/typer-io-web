import React from 'react';
import styles from './index.module.css';

interface Props {
  children?: React.ReactNode;
}

const Banner = (props: Props): JSX.Element => {
  const { children } = props;

  return <div className={styles.root}>{children}</div>;
};

export default Banner;
