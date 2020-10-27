import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useTransition, config, animated } from 'react-spring';
import { AppState } from '../../../store';
import styles from './index.module.css';

interface Props {
  isSolo: boolean;
}

const ClientList = (props: Props): JSX.Element => {
  const { isSolo } = props;
  const users = useSelector((state: AppState) => state.game.room.clients);

  const transition = useTransition(users, {
    keys: (users) => users.id,
    from: {
      opacity: '0',
      width: '0%',
      transform: 'translate3d(0, -100%, 0)'
    },
    enter: (_item) => async (next, _cancel): Promise<void> => {
      await next({ width: isSolo ? '100%' : '25%' });
      await next({ opacity: '1', transform: 'translate3d(0, 0%, 0)' });
    },
    leave: {
      opacity: '0',
      transform: 'translate3d(0, -100%, 0)',
      width: '0%'
    },
    config: config.default
  });

  return (
    <div className={`${styles.root} ${isSolo && styles.soloRoot}`}>
      {users.length > 0 && (
        <div className={styles.container}>
          {transition((style, item) => (
            <animated.div
              className={styles.card}
              style={{ width: style.width }}
              key={item.key}
            >
              <animated.div
                className={styles.cardWrapper}
                style={{ transform: style.transform, opacity: style.opacity }}
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
                <div
                  className={styles.username}
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
              </animated.div>
            </animated.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(ClientList);
