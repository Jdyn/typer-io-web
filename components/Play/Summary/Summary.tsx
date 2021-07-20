import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Paper from '../../Shared/Paper';
import { AppState } from '../../../store';

import styles from './index.module.css';
import Link from 'next/link';

const MatchSumary = (): JSX.Element => {
  // const [completed, setCompleted] = useState([]);

  // const clients = useSelector(
  //   (state: AppState) => state.game.room.clients || []
  // );

  // useEffect(() => {
  //   clients.forEach((client) => {
  //     if (client.gamePiece.isComplete && !completed.includes(client)) {
  //       setCompleted([...completed, client]);
  //     }
  //   });
  // }, [clients, completed]);

  return (
    <Paper title="Summary">
      {/* <div className={styles.header}>
        <div className={`${styles.count} ${styles.headerItem}`}>#</div>
        <div className={`${styles.content} ${styles.headerItem}`}>Name</div>
        <div className={styles.timestamp}>Errors</div>
        <div className={styles.item}>Accuracy</div>
        <div className={styles.item}>WPM</div>
      </div>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {clients ? (
            [
              ...completed,
              ...clients.filter((item) => !item.gamePiece.isComplete)
            ]
              .sort((a, b) => (a.gamePiece.wpm < b.gamePiece.wpm ? 1 : -1))
              .map((item, index) => (
                <div className={styles.entry} key={item.id}>
                  <div className={styles.count}>{index + 1}.</div>
                  <div className={styles.content}>
                    <span className={item.user ? styles.verified : ''}>
                      {item.user?.username ? (
                        <Link href={`/u/${item.user.username}`}>
                          <a className={styles.nameLink}>
                            {item.user?.username}
                          </a>
                        </Link>
                      ) : (
                        item.username
                      )}
                    </span>
                  </div>
                  <div className={styles.item}>{item.gamePiece.errors}</div>
                  <div className={styles.item}>{item.gamePiece.accuracy}%</div>
                  <div className={styles.item}>{item.gamePiece.wpm}</div>
                </div>
              ))
          ) : (
            <div className={styles.notice}>
              Waiting for players to finish...
            </div>
          )}
        </div>
      </div> */}
    </Paper>
  );
};

export default React.memo(MatchSumary);
