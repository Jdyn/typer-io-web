import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import ClientList from '../ClientList';
import { silentEmit } from '../../../services/socket';
import Button from '../../Shared/Button';
import { AppState } from '../../../store';
import styles from './index.module.css';
import Chat from '../Chat';
import Banner from '../../Shared/Banner';
import Loader from '../../Shared/Loader';

const Lobby = (_props): JSX.Element => {
  const room = useSelector((state: AppState) => state.game.room);
  const game = useSelector((state: AppState) => state.game);
  const socket = useSelector((state: AppState) => state.game.socket);
  const currrentClient = useMemo(
    () => room.clients.filter((item) => item.id === game.meta?.id)[0] || {},
    [room.clients, game.meta]
  );

  const handleStart = (): void => {
    silentEmit('START_CUSTOM_GAME', {});
  };

  return (
    <main>
      <div className={styles.root}>
        <ClientList isSolo={false} />
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
                <div>{`${process.env.BASE_URL}/lobby/${room.id}`}</div>
                {currrentClient.isHost ? (
                  <Button
                    padding="10px"
                    margin="10px 0px"
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
      </div>
    </main>
  );
};

export default Lobby;
