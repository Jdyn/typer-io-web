import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { m } from 'framer-motion';
import styles from './index.module.css';
import { AppState } from '../../../store';

// TODO: probably use useMemo for this so its not called every render
export const placements = (rank: number): string => {
  if (typeof rank !== 'number') return '-';

  let suffix = '';

  if (rank % 10 === 1) suffix = 'st';
  else if (rank % 10 === 2) suffix = 'nd';
  else if (rank % 10 === 3) suffix = 'rd';
  else suffix = 'th';

  return `${rank}${suffix}`;
};

interface Props {
  isSolo?: boolean;
}

const ClientList = (props: Props): JSX.Element => {
  const { isSolo } = props;
  const users = useSelector((state: AppState) => state.game.room.clients);

  const variants = useMemo(
    () => ({
      initial: {
        opacity: 0,
        width: '0%',
        y: '-100%'
      },
      enter: (solo) => {
        return {
          width: solo ? '100%' : '25%',
          maxWidth: solo ? '275px' : '235px',
          opacity: 1,
          y: '0%'
        };
      },
      exit: {
        opacity: 0,
        y: '-100%',
        width: '0%'
      }
    }),
    []
  );

  const clients = useMemo(
    () =>
      users.map((item) => (
        <m.div
          className={styles.card}
          initial="initial"
          animate="enter"
          exit="exit"
          variants={variants}
          custom={isSolo}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 25,
            velocity: 2
          }}
          key={item.id}
        >
          <div className={users?.length > 5 ? styles.miniCardWrapper : styles.cardWrapper}>
            <div className={styles.stats} style={{ display: users?.length > 5 ? 'none' : 'flex' }}>
              <span className={styles.stat}>
                <span className={styles.statHeader}>ERRORS</span>
                {item.gamePiece.errors}
              </span>
              <span className={styles.stat}>
                <span className={styles.statHeader}>ACCURACY</span>
                {item.gamePiece.accuracy}%
              </span>
              <span className={styles.stat}>
                <span className={styles.statHeader}>TIME</span>
                {item.gamePiece.time}
              </span>
            </div>
            <div className={styles.display} style={{ background: item.gamePiece.color }}>
              <span>
                <span>{item.emoji}</span>
                {item.username}
              </span>
              <div className={styles.wpm}>
                {item.gamePiece.wpm} <span className={styles.statHeader}>WPM</span>
              </div>
              <div className={styles.placement} style={{ color: item.gamePiece.color }}>
                {placements(item.gamePiece?.rank) || '-'}
              </div>
            </div>
          </div>
        </m.div>
      )),
    [isSolo, users, variants]
  );

  return (
    <div className={`${styles.root} ${isSolo && styles.soloRoot}`}>
      {users.length > 0 && (
        <div
          className={styles.container}
          style={{ flexWrap: users?.length > 5 ? 'wrap' : 'nowrap' }}
        >
          {clients}
        </div>
      )}
    </div>
  );
};

ClientList.defaultProps = {
  isSolo: false
};

export default memo(ClientList);
