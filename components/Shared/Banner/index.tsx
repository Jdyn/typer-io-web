import { ReactNode, memo } from 'react';
import styles from './index.module.css';

interface Props {
  children?: ReactNode;
  title?: string;
}

const Banner = (props: Props): JSX.Element => {
  const { children, title } = props;

  return title ? (
    <div className={styles.root}>
      <h3>{title}</h3>
    </div>
  ) : (
    <div className={styles.root}>{children}</div>
  );
};

Banner.defaultProps = {
  children: null,
  title: null
};

export default memo(Banner);
