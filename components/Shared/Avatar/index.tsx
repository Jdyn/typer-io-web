import { useState } from 'react';
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
  const [failed, setFailed] = useState(false);

  const handleLoad = () => {
    setFailed(false);
  };

  const handleError = () => {
    setFailed(true);
  };

  return (
    <div
      className={`${styles.portrait} ${className || ''}`}
      style={{ width: size, height: size, minWidth: size, minHeight: size, marginRight }}
    >
      {src && !failed && (
        <img
          src={src}
          alt={alt}
          className={styles.image}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  );
};

export default Avatar;
