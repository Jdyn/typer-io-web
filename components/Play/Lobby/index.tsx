import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import ClientList from '../ClientList';
import { silentEmit } from '../../../services/socket';
import Button from '../../Shared/Button';
import { AppState } from '../../../store';
import styles from './index.module.css';
import Chat from '../Chat';

const Lobby = (props) => {
  const room = useSelector((state: AppState) => state.game.room);
  const game = useSelector((state: AppState) => state.game);
  const socket = useSelector((state: AppState) => state.game.socket);
  const currrentClient = useMemo(
    () => room.clients.filter((item) => item.id === game.meta?.id)[0] || {},
    [room.clients, game.meta]
  );

  const handleStart = () => {
    silentEmit('START_CUSTOM_GAME', {});
  };

  return (
    <main>
      <div className={styles.root}>
        <ClientList />
        <div className={styles.container}>
          {room.id ? (
            <>
              <span>Share this link to invite players.</span>
              <div>{`https://typer.io/lobby/${room.id}`}</div>
              {currrentClient.isHost ? (
                <Button padding="10px" margin="10px 0px" onClick={() => handleStart()}>
                  Start Game
                </Button>
              ) : (
                <span>Waiting for the host to start the game.</span>
              )}
            </>
          ) : (
            <div>{socket.error}</div>
          )}
        </div>
        <Chat />
      </div>
    </main>
  );
};

export default Lobby;
