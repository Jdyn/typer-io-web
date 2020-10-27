import { memo } from 'react';
import { useSpring, animated, config } from 'react-spring';
import styles from './index.module.css';

interface Props {
  position: number | null;
  color: string;
  emoji: string;
}

const Piece = (props: Props): JSX.Element => {
  const { position, color, emoji } = props;

  const movement = useSpring({
    to: {
      marginLeft: position === null || position === 0 ? '0%' : '40%'
    },
    from: {
      marginLeft: '0%'
    },
    config: config.stiff
  });

  return (
    <animated.div
      style={{
        ...movement,
        left: position === null ? '-10%' : '-5%'
      }}
      className={styles.gamePiece}
    >
      <span style={{ background: color }} role="img" aria-label="sheep">
        <span>{emoji}</span>
      </span>
    </animated.div>
  );
};

export default memo(Piece);
