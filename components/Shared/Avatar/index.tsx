import styles from './index.module.css';

interface Props {
  src?: string | null;
  alt?: string;
  size?: number;
  className?: string;
  marginRight?: number;
}

const Avatar = ({
  src,
  alt = 'avatar',
  size = 36,
  className,
  marginRight = 10
}: Props): JSX.Element | null => {
  return (
    <div
      className={`${styles.portrait} ${className || ''}`}
      style={{ width: size, height: size, minWidth: size, minHeight: size, marginRight }}
    >
      <img
        src={src}
        alt={alt}
        className={styles.image}
        onError={(e) => (e.currentTarget.style.display = 'none')}
      />
    </div>
  );
};

export default Avatar;
