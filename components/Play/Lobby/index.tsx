import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import ClientList from '../ClientList';
import { silentEmit } from '../../../services/socket';
import Button from '../../Shared/Button';
import { AppState } from '../../../store';
import styles from './index.module.css';
import Chat from '../Chat';
import Adsense from '../../Shared/Adsense';
import Banner from '../../Shared/Banner';
import Loader from '../../Shared/Loader';
import Profile from '../../Home/Profile';

const difficulties = ['easy', 'medium', 'hard', 'random'];

const Lobby = (_props): JSX.Element => {
  const router = useRouter();
  const room = useSelector((state: AppState) => state.game.room);
  const game = useSelector((state: AppState) => state.game);
  const socket = useSelector((state: AppState) => state.game.socket);
  const currrentClient = useMemo(
    () => room.clients.filter((item) => item.id === game.meta?.id)[0] || {},
    [room.clients, game.meta]
  );

  const [hidden, setHidden] = useState(true);

  const handleStart = (): void => {
    silentEmit('START_CUSTOM_GAME', {});
  };

  const handleSettingsUpdate = (payload) => {
    silentEmit('UPDATE_CUSTOM_GAME', payload);
  };

  const handleUserUpdate = (payload) => {
    silentEmit('CLIENT_SETTINGS_UPDATE', payload);
  };

  const handleKick = (event, id): void => {
    event.preventDefault();

    silentEmit('KICK_PLAYER_CUSTOM_GAME', { id });
  };

  useEffect(() => {
    if (socket.kicked) {
      router.replace('/');
    }
  }, [router, socket.kicked]);

  return (
    <main>
      <div className={styles.root}>
        <ClientList isSolo={false} />
        <div className={styles.settingsRoot}>
          <Banner>
            <h3>Settings</h3>
          </Banner>
          <div className={styles.settingsContainer}>
            <div className={styles.setting}>
              <h3>Difficulty</h3>
              <div className={styles.difficultyWrapper}>
                {difficulties.map((key) => (
                  <button
                    type="button"
                    key={key}
                    className={`${styles.difficultyButton} ${
                      room.difficulty === key ? styles.selected : ''
                    }`}
                    onClick={() => handleSettingsUpdate({ difficulty: key })}
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>
            {currrentClient.isHost && (
              <div className={styles.setting}>
                <h3>Kick Players</h3>
                {game?.room?.clients?.map((client) => (
                  <div key={client.id} className={styles.client}>
                    <span style={{ color: client.gamePiece.color }}>
                      {client.username}
                    </span>
                    {client.id !== currrentClient.id && (
                      <Button onClick={(e) => handleKick(e, client.id)}>
                        kick
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className={styles.container}>
          <Banner>
            <h3>Custom Lobby</h3>
          </Banner>
          <div className={styles.wrapper}>
            {socket.pending ? (
              <div>
                <Loader width="36px" height="36px" color="#6772e5" />
              </div>
            ) : null}
            {room.id && (
              <>
                <span>Share this link to invite players.</span>
                <span>(you can copy the link while hidden)</span>
                <div className={styles.linkContainer}>
                  <div
                    style={{ filter: hidden ? 'blur(4px)' : '' }}
                  >{`${process.env.BASE_URL}/lobby/${room.id}`}</div>
                  <Button
                    margin="0px"
                    padding="0px 5px"
                    onClick={() => setHidden(!hidden)}
                  >
                    {hidden ? 'show' : 'hide'}
                  </Button>
                </div>
                {currrentClient.isHost ? (
                  <Button
                    padding="8px"
                    margin="10px 0px"
                    width="125px"
                    onClick={(): void => handleStart()}
                  >
                    Start Game
                  </Button>
                ) : (
                  <span>Waiting for the host to start the game.</span>
                )}
              </>
            )}
            {socket.errored && <div>{socket.error}</div>}
          </div>
        </div>
        <Chat />
        <div className={styles.profileContainer}>
          <Profile
            requireSave
            onClick={(payload) => handleUserUpdate(payload)}
          />
        </div>
        <section className={styles.aContainer}>
          <Adsense
            client="ca-pub-3148839588626786"
            slot="8048104115"
            style={{ display: 'block' }}
            format="auto"
            responsive="true"
          />
        </section>
      </div>
    </main>
  );
};

export default Lobby;
