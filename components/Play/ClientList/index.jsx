/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import { useTransition, config, animated } from 'react-spring';
import styles from './index.module.css';

const ClientList = (props) => {
  const { isSolo } = props;
  const users = useSelector((state) => state.game.room.clients);

  const transitions = useTransition(users, (client) => client.id, {
    from: {
      opacity: 0,
      width: '0%',
      transform: 'translate3d(0, -100%, 0)'
    },
    enter: () => async (next, _cancel) => {
      await next({ width: isSolo ? '100%' : '25%' });
      await next({ opacity: 1, transform: 'translate3d(0, 0%, 0)' });
    },
    leave: {
      opacity: 0,
      transform: 'translate3d(0, -100%, 0)',
      width: '0%'
    },
    config: config.default
  });

  return (
    <div className={`${styles.root} ${isSolo && styles.soloRoot}`}>
      {users.length > 0 && (
        <div className={styles.container}>
          {transitions.map(({ item, props, key }) => (
            <animated.div className={styles.card} style={{ width: props.width }} key={key}>
              <animated.div
                className={styles.cardWrapper}
                style={{ transform: props.transform, opacity: props.opacity }}
              >
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
                <div className={styles.username} style={{ background: item.gamePiece.color }}>
                  {item.username}
                  <div className={styles.wpm}>
                    {item.gamePiece.wpm} <span className={styles.statHeader}>WPM</span>
                  </div>
                </div>
              </animated.div>
            </animated.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(ClientList);
