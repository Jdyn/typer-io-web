import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Paper from '../../Shared/Paper';
import ApiService from '../../../services/api';
import formatTime from '../../../util/formatTime';
import Filter from '../../Shared/Filter';
import styles from './index.module.css';
import { AppState } from '../../../store';
import Adsense from '../../Shared/Adsense';
import Link from 'next/link';

const filters = [
  {
    name: 'all time',
    key: 'all-time'
  }
];

const Leaderboard = (): JSX.Element => {
  const snippet = useSelector((state: AppState) => state.game.room.snippet);
  const clients = useSelector((state: AppState) =>
    state.game.room.clients.map((client) => ({
      id: client.id,
      wpm: client?.gamePiece.wpm,
      isComplete: client.gamePiece.isComplete
    }))
  );

  const [state, set] = useState([]);

  //TODO: Seems like a hacky solution for updating the hiscores...
  const [ids, setIds] = useState([]);

  const fetchHiscores = () => {
    if (snippet?.id) {
      ApiService.fetch(`/snippet/${snippet.id}/matches`).then((response) => {
        if (response.ok) {
          set(response.result.matches);
        }
      });
    }
  };

  useEffect(() => {
    // So, every time a client finishes, we check a few things
    // to determine if we should fetch the hiscores again for a seemingly
    // live update.
    clients.forEach((client) => {
      if (
        client.isComplete &&
        client.wpm > state[state.length - 1].wpm &&
        !ids.includes(client.id)
      ) {
        fetchHiscores();
        setIds([...ids, client.id]);
      }
    });
  }, [set, state, clients, snippet?.id, setIds, ids]);

  useEffect(() => {
    fetchHiscores();
  }, [snippet?.id]);

  return (
    <div className={styles.root}>
      <Paper title="Hiscores">
        <Filter fontSize="15" filters={filters} onClick={null} />
        <div className={styles.container}>
          <div className={styles.wrapper}>
            {state.map((item, index) => (
              <div className={styles.entry} key={item.id}>
                <div className={styles.count}>{index + 1}.</div>
                <div className={styles.content}>
                  <span className={item.user ? styles.verified : ''}>
                    {item.user?.username ? (
                      <Link href={`/u/${item.user.username}`}>
                        <a
                          target="_blank"
                          rel="noreferrer noopener"
                          className={styles.nameLink}
                        >
                          {item.user?.username}
                        </a>
                      </Link>
                    ) : (
                      item.nickname
                    )}
                    {formatTime(item.created_at) === 'Just now' && (
                      <span className={styles.newBadge}>NEW</span>
                    )}
                  </span>
                  <div className={styles.timestamp}>
                    {formatTime(item.created_at)}
                  </div>
                </div>
                <div className={styles.item}>{item.wpm} WPM</div>
              </div>
            ))}
          </div>
        </div>
      </Paper>
      <section
        style={{
          margin: '20px 0px',
          maxWidth: '540px !important'
        }}
      >
        <Adsense
          client="ca-pub-3148839588626786"
          layout="in-article"
          slot="6958577240"
          format="fluid"
        />
      </section>
    </div>
  );
};

export default React.memo(Leaderboard);
