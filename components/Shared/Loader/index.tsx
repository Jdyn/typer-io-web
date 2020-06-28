import React from 'react';
import styles from './index.module.css';

interface Props {
  width?: string;
  height?: string;
}

const Loader = (props: Props): JSX.Element => {
  const { width, height } = props;

  return (
    <img
      width={width}
      height={height}
      className={styles.loader}
      alt="loader"
      src="/static/images/loading.svg"
    />
  );
};

export default Loader;
