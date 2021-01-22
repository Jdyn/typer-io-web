import Banner from '../Banner';
import styles from './index.module.css';

interface Props {
  children?: React.ReactNode;
  title: string;
}

const Paper = (props: Props): JSX.Element => {
  const { children, title } = props;

  return (
    <div className={styles.root}>
      <Banner>
        <h3>{title}</h3>
      </Banner>
      <div className={styles.container}>{children}</div>
    </div>
  );
};

Paper.defaultProps = {
  children: null
};

export default Paper;
