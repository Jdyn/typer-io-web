import { ReactNode } from 'react';
import styles from './index.module.css';

interface Props {
  children?: ReactNode;
}

const Banner = (props: Props): JSX.Element => {
  const { children } = props;

  return <div className={styles.root}>{children}</div>;
};

Banner.defaultProps = {
  children: null
};

export default Banner;
