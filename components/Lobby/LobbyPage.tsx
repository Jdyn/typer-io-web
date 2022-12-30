/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { silentEmit } from '../../services/socket';
import { AppState } from '../../store';
import copyToClipboard from '../../util/copyToClipboard';
import Profile from '../Home/Profile';
import Chat from '../Play/Chat';
import ClientList from '../Play/ClientList';
import Button from '../Shared/Button';
import Loader from '../Shared/Loader';
import Paper from '../Shared/Paper';
import TextBox from '../Shared/TextBox';
import styles from './index.module.css';

const Adsense = dynamic(() => import('../Shared/Adsense'), {
  ssr: false
});

const difficulties = ['easy', 'medium', 'hard', 'random', 'custom'];

const LobbyPage = () => {
  const router = useRouter();
  const { room, meta, socket } = useSelector((state: AppState) => state.game);
  const [copied, setCopied] = useState(false);
  const [hidden, setHidden] = useState(true);

  const client = useMemo(
    () => room.clients.filter((item) => item.id === meta.id)[0] || {},
    [room, meta]
  );

  useEffect(() => {
    if (socket.kicked) {
      router.replace('/');
    }
  }, [router, socket]);

  const handleStart = (): void => {
    silentEmit('START_CUSTOM_GAME', {});
  };

  useEffect(() => {
    if (room.difficulty === 'custom' && room.customText) {
      const textElement = document.getElementById('lobby-custom-text') as HTMLTextAreaElement;
      textElement.value = room.customText;
    }
  }, [room.difficulty, room.customText]);

  const handleSettingsUpdate = (payload) => {
    if (payload.customText) {
      const textElement = document.getElementById('lobby-custom-text') as HTMLTextAreaElement;
      if (textElement !== null) {
        silentEmit('UPDATE_CUSTOM_GAME', { customText: textElement.value });
      }
    } else {
      silentEmit('UPDATE_CUSTOM_GAME', payload);
    }
  };

  return (
    <main>
      <div className={styles.root}>
        <ClientList isSolo={false} />
        <section className={styles.settings}>
          <Paper title="Settings">
            <div className={styles.settingsContainer}>
              <h3>Difficulty</h3>
              <div className={styles.settingWrapper}>
                {difficulties.map((key) => (
                  <button
                    type="button"
                    key={key}
                    className={`${styles.settingButton} ${
                      room.difficulty === key ? styles.selected : ''
                    }`}
                    onClick={() => handleSettingsUpdate({ difficulty: key })}
                  >
                    {key}
                  </button>
                ))}
                {room.difficulty === 'custom' && (
                  <>
                    <TextBox id="lobby-custom-text" disabled={!client.isHost} maxLength={650} />
                    {client.isHost && (
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
              <h3>Maximum Players</h3>
              <div className={styles.settingWrapper}>
                {[5, 10, 15, 20, 25, 30, 35, 75].map((key) => (
                  <button
                    type="button"
                    key={key}
                    className={`${styles.settingButton} ${
                      room.maxSize === key ? styles.selected : ''
                    }`}
                    onClick={() => handleSettingsUpdate({ maxSize: key })}
                  >
                    {key}
                  </button>
                ))}
              </div>
              {client.isHost && (
                <>
                  <h3>Kick Players</h3>
                  {room?.clients?.map((player) => (
                    <div key={player.id} className={styles.client}>
                      <span style={{ color: client.gamePiece.color }}>{player.username}</span>
                      {player.id !== client.id && (
                        <Button
                          onClick={() => silentEmit('KICK_PLAYER_CUSTOM_GAME', { id: player.id })}
                        >
                          kick
                        </Button>
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>
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
                  <span
                    role="button"
                    id="lobby-link"
                    style={{ filter: hidden ? 'blur(3px)' : '' }}
                    onClick={() => copyToClipboard('lobby-link', setCopied)}
                  >{`${process.env.BASE_URL}/lobby/${room.id}`}</span>
                  <div className={styles.buttons}>
                    <Button
                      margin="0px"
                      padding="0px 5px"
                      onClick={() => copyToClipboard('lobby-link', setCopied)}
                    >
                      copy
                    </Button>
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
                </div>

                {client.isHost ? (
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
        </Paper>
        <Chat />
        <section className={styles.profile}>
          <Profile requireSave />
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
