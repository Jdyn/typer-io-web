import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { silentEmit } from '../../services/socket';
import { AppState } from '../../store';
import copyToClipboard from '../../util/copyToClipboard';
import Profile from '../../app/Home/Profile';
import Chat from '../Play/Chat';
import ClientList from '../Play/ClientList';
import Adsense from '../Shared/Adsense';
import Banner from '../Shared/Banner';
import Button from '../Shared/Button';
import Loader from '../Shared/Loader';
import TextBox from '../Shared/TextBox';
import styles from './index.module.css';

const difficulties = ['easy', 'medium', 'hard', 'random', 'custom'];

const LobbyPage = (): JSX.Element => {
  const router = useRouter();
  const room = useSelector((state: AppState) => state.game.room);
  const game = useSelector((state: AppState) => state.game);
  const socket = useSelector((state: AppState) => state.game.socket);
  const [copied, setCopied] = useState(false);
  const [hidden, setHidden] = useState(true);
  const currrentClient = useMemo(
    () => room.clients.filter((item) => item.id === game.meta?.id)[0] || {},
    [room.clients, game.meta]
  );

  useEffect(() => {
    if (socket.kicked) {
      router.replace('/');
    }
  }, [router, socket.kicked]);

  const handleStart = (): void => {
    silentEmit('START_CUSTOM_GAME', {});
  };

  useEffect(() => {
    if (game.room?.difficulty === 'custom' && game.room?.customText) {
      const customText = document.getElementById('lobby-custom-text') as HTMLTextAreaElement;
      customText.value = game.room.customText;
    }
  }, [game.room]);

  const handleSettingsUpdate = (payload) => {
    if (payload.customText) {
      const customText = document.getElementById('lobby-custom-text') as HTMLTextAreaElement;
      if (customText !== null) {
        // eslint-disable-next-line no-param-reassign
        silentEmit('UPDATE_CUSTOM_GAME', { customText: customText.value });
        return;
      }
    }

    silentEmit('UPDATE_CUSTOM_GAME', payload);
  };

  const handleKick = (id: number): void => {
    silentEmit('KICK_PLAYER_CUSTOM_GAME', { id });
  };

  return (
    <main>
      <div className={styles.root}>
        <ClientList isSolo={false} />

        <section className={styles.aContainer2}>
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
                  {room.difficulty === 'custom' && (
                    <>
                      <TextBox
                        id="lobby-custom-text"
                        disabled={!currrentClient.isHost}
                        maxLength={650}
                      />
                      {currrentClient.isHost && (
                        <Button
                          padding="5px"
                          onClick={() => handleSettingsUpdate({ customText: true })}
                        >
                          save text
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className={styles.setting}>
                <h3>Maximum Players</h3>
                <div className={styles.difficultyWrapper}>
                  {[5, 10, 15, 20, 25, 30, 35, 75].map((key) => (
                    <button
                      type="button"
                      key={key}
                      className={`${styles.difficultyButton} ${
                        room.maxSize === key ? styles.selected : ''
                      }`}
                      onClick={() => handleSettingsUpdate({ maxSize: key })}
                    >
                      {key}
                    </button>
                  ))}
                </div>
              </div>
              {currrentClient.isHost && (
                <>
                  <div className={styles.setting}>
                    <h3>Kick Players</h3>
                    {game?.room?.clients?.map((client) => (
                      <div key={client.id} className={styles.client}>
                        <span style={{ color: client.gamePiece.color }}>{client.username}</span>
                        {client.id !== currrentClient.id && (
                          <Button onClick={() => handleKick(client.id)}>kick</Button>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          <Adsense
            path={router.pathname}
            client="ca-pub-3148839588626786"
            slot="7384036938"
            format="fluid"
            layout="in-article"
          />
        </section>
        <div className={styles.container}>
          <Banner>
            <h3>
              Lobby ( {room.count || 0} / {room.maxSize || 0} players )
            </h3>
          </Banner>
          <div className={styles.wrapper}>
            {socket.pending ? (
              <div>
                <Loader width="36px" height="36px" color="#6772e5" />
              </div>
            ) : null}
            {room.id && (
              <>
                <span>share this link to invite players.</span>
                <span>{copied ? 'Copied!' : 'Click the link to copy!'}</span>
                <div className={styles.linkContainer}>
                  <button
                    type="button"
                    id="lobby-link"
                    className={styles.lobbyLink}
                    style={{ filter: hidden ? 'blur(4px)' : '' }}
                    onClick={() => copyToClipboard('lobby-link', setCopied)}
                  >{`${process.env.BASE_URL}/lobby/${room.id}`}</button>
                  <Button
                    margin="0px"
                    padding="0px 5px"
                    onClick={() => {
                      setHidden(!hidden);
                      setCopied(false);
                    }}
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
        <section className={styles.aContainer3}>
          <div className={styles.profileContainer}>
            <Profile requireSave />
          </div>
          <Adsense
            path={router.pathname}
            client="ca-pub-3148839588626786"
            slot="6675614018"
            format="fluid"
            layout="in-article"
          />
        </section>
      </div>
    </main>
  );
};

export default LobbyPage;
