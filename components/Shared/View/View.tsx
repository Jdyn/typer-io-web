import React from 'react';

import styles from './View.module.css';

interface ViewProps {
  children: React.ReactNode;
}

const View = ({ children }: ViewProps): JSX.Element => {
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>{children}</div>
    </div>
  );
};

export default View;
