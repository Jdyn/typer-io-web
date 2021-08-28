import { m } from 'framer-motion';
import { memo } from 'react';
import styles from './index.module.css';

interface Props {
  position: number | null;
  color: string;
  emoji: string;
  id: string;
}

const spring = {
  left: { type: 'spring', stiffness: 300, damping: 30, velocity: 2 }
};

const variants = {
  enter: {
    left: '0%'
  },
  center: (position: number) => {
    return {
      left: position === null ? '0%' : '100%'
    };
  }
};

const Piece = (props: Props): JSX.Element => {
  const { position, emoji, id } = props;

  return (
    <m.div
      layoutId={id}
      key={id}
      custom={position}
      transition={spring}
      variants={variants}
      initial="enter"
      animate="center"
      className={styles.gamePiece}
    >
      <span role="img" aria-label="sheep">
        <span>{emoji}</span>
      </span>
    </m.div>
  );
};

export default memo(Piece);
