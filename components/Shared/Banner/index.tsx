import { ReactNode } from 'react';
import styles from './index.module.css';

interface Props {
  children?: ReactNode;
  title?: string;
}

const Banner = ({ children, title }: Props): JSX.Element => {
  return (
    <div className={styles.root}>
      {title && <h3>{title}</h3>}
      {children}
    </div>
  );
};

Banner.defaultProps = {
  children: null,
  title: null
};

export default Banner;
