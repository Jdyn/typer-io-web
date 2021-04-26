/* eslint-disable react/prop-types */
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './index.module.css';
import { AppState } from '../../../store';

const placements = (rank: number): string => {
  if (typeof rank !== 'number') return '-';

  let suffix = '';

  if (rank % 10 === 1) suffix = 'st';
  else if (rank % 10 === 2) suffix = 'nd';
  else if (rank % 10 === 3) suffix = 'rd';
  else suffix = 'th';

  return `${rank}${suffix}`;
};

const ClientList = (props): JSX.Element => {
  const { isSolo } = props;
  const users = useSelector((state: AppState) => state.game.room.clients);

  const variants = {
    initial: {
      opacity: 0,
      width: '0%',
      y: '-100%'
    },
    enter: (isSolo) => {
      return {
        width: isSolo ? '100%' : '25%',
        maxWidth: isSolo ? 'auto' : '235px',
        opacity: 1,
        y: '0%'
      };
    },
    exit: {
      opacity: 0,
      y: '-100%',
      width: '0%'
    }
  };

  return (
    <div className={`${styles.root} ${isSolo && styles.soloRoot}`}>
      {users.length > 0 && (
        <div
          className={styles.container}
          style={{ flexWrap: users?.length > 5 ? 'wrap' : 'nowrap' }}
        >
          {users?.length > 5 ? (
            <AnimatePresence>
              {users.map((item) => (
                <motion.div
                  className={styles.card}
                  style={{ marginBottom: '10px' }}
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
                  <div className={styles.miniCardWrapper}>
                    <div className={styles.username}>
                      <div
                        className={styles.usernameWrapper}
                        style={{ background: item.gamePiece.color }}
                      >
                        <span>
                          <span>{item.emoji}</span>
                          {item.username}
                        </span>
                        <div className={styles.wpm}>
                          {item.gamePiece.wpm}{' '}
                          <span className={styles.statHeader}>WPM</span>
                        </div>
                      </div>
                      {!isSolo && (
                        <div className={styles.placement}>
                          {placements(item.gamePiece?.rank) || '-'}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <AnimatePresence>
              {users.map((item) => (
                <motion.div
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
                  <div className={styles.cardWrapper}>
                    <div className={styles.stats}>
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
                    <div className={styles.username}>
                      <div
                        className={styles.usernameWrapper}
                        style={{ background: item.gamePiece.color }}
                      >
                        <span>
                          <span>{item.emoji}</span>
                          {item.username}
                        </span>
                        <div className={styles.wpm}>
                          {item.gamePiece.wpm}{' '}
                          <span className={styles.statHeader}>WPM</span>
                        </div>
                      </div>
                      {!isSolo && (
                        <div className={styles.placement}>
                          {placements(item.gamePiece?.rank) || '-'}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(ClientList);
