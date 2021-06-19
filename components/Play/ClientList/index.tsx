/* eslint-disable react/prop-types */
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './index.module.css';
import { AppState } from '../../../store';
import { useTransition, animated, config } from '@react-spring/web';

//TODO: probably use useMemo for this so its not called every render
export const placements = (rank: number): string => {
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

  const transitions = useTransition(users, {
    from: {
      transform: 'translate3d(0, -200%, 0)',
      width: '0%'
    },
    enter: (_item) => async (next, _cancel) => {
      await next({ width: '20%' });
      await next({ transform: 'translate3d(0, 0%, 0)' });
    },
    leave: {
      opacity: 0,
      width: '0%'
    },
    keys: (user) => user.id
  });

  return (
    <div className={`${styles.root} ${isSolo && styles.soloRoot}`}>
      {users.length > 0 && (
        <div
          className={styles.container}
          style={{ flexWrap: users?.length > 5 ? 'wrap' : 'nowrap' }}
        >
          {users?.length > 5 ? (
            <div>
              {transitions((style, item) => (
                <animated.div
                  className={styles.card}
                  style={{ ...style, marginBottom: '10px' }}
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
                </animated.div>
              ))}
            </div>
          ) : (
            <>
              {transitions((style, item) => (
                <animated.div
                  className={styles.card}
                  style={style}
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
                </animated.div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(ClientList);
