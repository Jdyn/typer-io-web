/* eslint-disable react/prop-types */
import {memo} from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './index.module.css';

const placements = {
  1: '1st',
  2: '2nd',
  3: '3rd',
  4: '4th',
  5: '5th'
};

const ClientList = (props) => {
  const { isSolo } = props;
  const users = useSelector((state) => state.game.room.clients);

  const variants = {
    initial: {
      opacity: 0,
      width: '0%',
      y: '-100%'
    },
    enter: (isSolo) => {
      return {
        width: isSolo ? '100%' : '25%',
        maxWidth: isSolo ? 'auto' : '265px',
        opacity: 1,
        zIndex: 5,
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
        <div className={styles.container}>
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
                  type: 'spring'
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
                      {item.gamePiece.accuracy}
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
                    <div className={styles.placement}>
                      {placements[item.gamePiece?.rank] || '-'}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default memo(ClientList);
