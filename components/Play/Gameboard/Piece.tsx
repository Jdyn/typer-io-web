import React from 'react';
import { useSpring, animated, config } from 'react-spring';
import styles from './index.module.css';

interface Props {
  position: number | null;
  color: string;
}

const Piece = (props: Props): JSX.Element => {
  const { position, color } = props;

  const movement = useSpring({
    to: {
      marginLeft: position === null ? '0%' : position === 0 ? '110%' : '100%'
    },
    from: {
      marginLeft: '0%'
    },
    config: config.stiff
  });

  return (
    <animated.div
      style={{ ...movement, background: color, left: position === null ? '-15%' : '-5%' }}
      className={styles.gamePiece}
    />
  );
};

export default React.memo(Piece);
