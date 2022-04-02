import { LazyMotion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Meta from 'components/Shared/Meta';
import Play from 'components/Play';
import { silentClose, emit } from 'services/socket';
import { useAppSelector } from 'store';
import { initSocket } from 'store/game/actions';
import useClient from 'Hooks/useClient';
import { useDispatch } from 'react-redux';
import Adsense from 'components/Shared/Adsense';
import Loader from 'components/Shared/Loader';

import styles from 'styles/Lobby.module.css';
import TextBox from 'components/Shared/TextBox';
import Button from 'components/Shared/Button';
import copyToClipboard from 'util/copyToClipboard';
import Profile from 'app/Home/Profile';
import Chat from 'components/Play/Chat';
import ClientList from 'components/Play/ClientList';
import Paper from 'components/Shared/Paper';
import View from 'components/Shared/View';

const loadFeatures = () => import('../../util/framerfeatures').then((res) => res.default);

const difficulties = ['easy', 'medium', 'hard', 'random', 'custom'];

function LobbyPage(): JSX.Element {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();
  const socket = useAppSelector(({ game }) => game.socket);
  const room = useAppSelector(({ game }) => game.room);
  const [copied, setCopied] = useState(false);
  const [hidden, setHidden] = useState(true);
  const currrentClient = useClient(room.clients);

  useEffect(() => {
    if (!router.isReady) return;

    if (!socket.connected && !socket.pending && !socket.errored) {
      const token = localStorage.getItem('token') || '';

      let config;

      if (id) {
        config = { roomType: 'PRIVATE', roomId: id };
      } else {
        config = {
          roomType: 'CUSTOM',
          quoteDifficulty: 'random',
          maxRoomSize: 5,
          isCustomQuote: false
        };
      }

      const nickname = localStorage.getItem('nickname') || null;
      const username = nickname || localStorage.getItem('username') || nickname;

      const emoji = localStorage.getItem('emoji') || '🐌';

      const payload = {
        username,
        token,
        emoji
      };

      dispatch(initSocket(payload, config));
    }
  }, [dispatch, id, router.isReady, socket]);

  useEffect(() => {
    if (socket.kicked) {
      router.replace('/');
    }
  }, [router, socket.kicked]);

  useEffect(() => {
    if (room?.difficulty === 'custom' && room?.customText) {
      const customText = document.getElementById('lobby-custom-text') as HTMLTextAreaElement;
      customText.value = room.customText;
    }
  }, [room]);

  useEffect(() => {
    return (): void => {
      silentClose();
    };
  }, [dispatch]);

  const handleSettingsUpdate = (payload) => {
    if (payload.customText) {
      const customText = document.getElementById('lobby-custom-text') as HTMLTextAreaElement;
      if (customText !== null) {
        // eslint-disable-next-line no-param-reassign
        emit('UPDATE_CUSTOM_GAME', { customText: customText.value });
        return;
      }
    }

    emit('UPDATE_CUSTOM_GAME', payload);
  };

  const handleKick = (clientId: number): void => {
    emit('KICK_PLAYER_CUSTOM_GAME', { id: clientId });
  };

  if (room.isStarted) {
    return (
      <LazyMotion features={loadFeatures} strict>
        <Play isCustom />
      </LazyMotion>
    );
  }

  return (
    <LazyMotion features={loadFeatures} strict>
      <Meta
        title="Private Lobby"
        description="Multiplayer Private Lobby"
        ogTitle="You have been invited to a typing race"
      />
      <main className={styles.root}>
        <ClientList />
        <section className={styles.left}>
          <Paper title="Settings">
            <View>
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
                <div className={styles.setting}>
                  <h3>Kick Players</h3>
                  {room?.clients?.map((client) => (
                    <div key={client.id} className={styles.client}>
                      <span style={{ color: client.gamePiece.color }}>{client.username}</span>
                      {client.id !== currrentClient.id && (
                        <Button onClick={() => handleKick(client.id)}>kick</Button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </View>
          </Paper>
          <Adsense
            path={router.pathname}
            client="ca-pub-3148839588626786"
            slot="7384036938"
            format="fluid"
            layout="in-article"
          />
        </section>
        <Paper title={`Lobby ( ${room.count || 0} / ${room.maxSize || 0} players )`}>
          <View>
            {socket.pending && (
              <div>
                <Loader width="36px" height="36px" color="#6772e5" />
              </div>
            )}
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
                    onClick={() => emit('START_CUSTOM_GAME')}
                  >
                    Start Game
                  </Button>
                ) : (
                  <span>Waiting for the host to start the game.</span>
                )}
              </>
            )}
            {socket.errored && <div>{socket.error}</div>}
          </View>
        </Paper>
        <Chat />
        <section className={styles.right}>
          <Profile />
          <Adsense
            path={router.pathname}
            client="ca-pub-3148839588626786"
            slot="6675614018"
            format="fluid"
            layout="in-article"
          />
        </section>
      </main>
    </LazyMotion>
  );
}

export default LobbyPage;
