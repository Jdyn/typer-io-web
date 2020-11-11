/* eslint-disable react/prop-types */
import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import styles from './index.module.css';
import Loader from '../../Shared/Loader';
import { silentEmit } from '../../../services/socket';
import Button from '../../Shared/Button';
import { AppState } from '../../../store';

const states = {
  room: 'ROOM',
  game: 'GAME'
};

interface Props {
  isCustom?: boolean;
  gameboard?: any;
}

const PlayStatus = (props: Props): JSX.Element => {
  const { gameboard, isCustom } = props;
  const socket = useSelector((state: AppState) => state.game.socket);
  const room = useSelector((state: AppState) => state.game.room);
  const [state, setState] = useState(states.room);
  const [header, setHeader] = useState({
    color: '#469cd0',
    text: 'Connecting to server...'
  });

  const game = useSelector((state: AppState) => state.game);
  const currrentClient = useMemo(
    () => room.clients.filter((item) => item.id === game.meta?.id)[0] || {},
    [room.clients, game.meta]
  );

  useEffect(() => {
    const { roomTime } = room;
    const { gameTime, isStarted, isOver } = gameboard;

    const getTime = (currentState): number => {
      switch (currentState) {
        case states.room:
          if (roomTime) {
            const seconds = roomTime.substring(
              roomTime.length - 2,
              roomTime.length
            );
            const time = parseInt(seconds, 10);
            if (time <= 0) {
              setState(states.game);
            }
            return time;
          }
          return null;
        case states.game:
          if (gameTime) {
            const minutes = gameTime.substring(1, 2);
            const seconds = gameTime.substring(
              gameTime.length - 2,
              gameTime.length
            );
            return parseInt(seconds, 10) + parseInt(minutes, 10) * 60;
          }
          return null;
        default:
          return null;
      }
    };

    const updateHeader = () => {
      const time = getTime(state);
      const { connected, errored, error } = socket;

      if (errored) {
        return {
          color: '#e57373',
          text: error || 'Connection error occured'
        };
      }

      if (isOver) {
        return { color: '#6772e5', text: 'Game has Ended' };
      }

      if (!connected) {
        return { color: '#469cd0', text: 'Connecting to server...' };
      }

      if (!isOver && connected) {
        if (time > 10) {
          return isStarted
            ? { color: '#81C784', text: 'GO!' }
            : { color: '#469cd0', text: 'Looking for Players...' };
        }

        if (time > 5) {
          return isStarted
            ? { color: '#e5a03e', text: 'GO!' }
            : { color: '#e5a03e', text: 'Get Ready...' };
        }

        if (time > 0) {
          return isStarted
            ? { color: '#e57373', text: 'GO!' }
            : { color: '#e57373', text: 'Get Set...' };
        }

        if (time <= 0) {
          return isStarted
            ? { color: '#81C784', text: 'GO!' }
            : { color: '#469cd0', text: 'Connecting to server...' };
        }
      }

      return { color: '#469cd0', text: 'Connecting to server...' };
    };

    setHeader(updateHeader());
  }, [gameboard, state, socket, room, setHeader]);

  const handleClick = () => {
    silentEmit('RESET_CUSTOM_GAME', {});
  };

  return (
    <>
      <div className={styles.root}>
        {isCustom && currrentClient.isHost && (
          <Button onClick={(): void => handleClick()}>reset game</Button>
        )}
        <div
          className={styles.container}
          style={{ backgroundColor: header.color }}
        >
          <h2>
            {gameboard.gameTime || room.roomTime || (
              <Loader width="36px" height="36px" color="white" />
            )}
          </h2>
          <h3>{header.text}</h3>
        </div>
      </div>
    </>
  );
};

export default PlayStatus;