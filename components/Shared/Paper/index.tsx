import { ReactNode } from 'react';
import Banner from '../Banner';
import styles from './index.module.css';

interface Props {
  children?: ReactNode;
  title: string;
}

const Paper = (props: Props): JSX.Element => {
  const { children, title } = props;

  return (
    <div className={styles.root}>
      <Banner>
        <h1>{title}</h1>
      </Banner>
      <div className={styles.container}>{children}</div>
    </div>
  );
};

Paper.defaultProps = {
  children: null
};

export default Paper;
