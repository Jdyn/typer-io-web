/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import styles from './index.module.css';
import Loader from '../../Shared/Loader';
import { silentEmit } from '../../../services/socket';
import Button from '../../Shared/Button';
import { AppState } from '../../../store';
import { GameboardState } from '../../../store/game/types';

const states = {
  room: 'ROOM',
  game: 'GAME'
};

interface Props {
  isCustom?: boolean;
  isSolo?: boolean;
  gameboard: GameboardState;
}

const PlayStatus = (props: Props): JSX.Element => {
  const { gameboard, isCustom, isSolo } = props;
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
    if (game.room.gameboard.gameTime === '') {
      setState(states.room);
    } else {
      setState(states.game);
    }
  }, [game.room.roomTime, game.room.gameboard.gameTime]);

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
          color: styles.red,
          text: error || 'Connection error occured'
        };
      }

      if (isOver) {
        return { color: styles.blue, text: 'Game has Ended' };
      }

      if (!connected) {
        return { color: styles.blue, text: 'Connecting to server...' };
      }

      if (isStarted) {
        return { color: styles.green, text: 'GO!' };
      }

      if (!isOver && connected) {
        if (time > 10) {
          return { color: styles.blue, text: 'Looking for Players...' };
        }

        if (time > 5) {
          return { color: styles.orange, text: 'Get Ready...' };
        }

        if (time > 0) {
          return { color: styles.red, text: 'Get Set...' };
        }

        if (time <= 0 && !isCustom && !isSolo) {
          return { color: styles.blue, text: 'Looking for Players...' };
        }
      }

      return { color: styles.blue, text: 'Connecting to server...' };
    };

    setHeader(updateHeader());
  }, [gameboard, state, socket, room, setHeader, isCustom, isSolo]);

  const handleClick = () => {
    silentEmit('RESET_CUSTOM_GAME', {});
  };

  const handleNewGame = () => {
    silentEmit('START_CUSTOM_GAME', {});
  };

  const handleNewPublicGame = () => {
    silentEmit('FIND_NEW_GAME', {});
  };

  return (
    <>
      <div className={styles.root}>
        {!isCustom &&
          (currrentClient?.gamePiece?.isComplete || room.gameboard.isOver) && (
            <div className="flex flex-1 mb-1 space-x-2">
              <Button onClick={(): void => handleNewPublicGame()}>
                new game
              </Button>
            </div>
          )}

        {isCustom && currrentClient.isHost && (
          <div className="flex flex-1 mb-1 space-x-2">
            <Button onClick={(): void => handleClick()}>lobby</Button>
            <Button onClick={(): void => handleNewGame()}>new game</Button>
          </div>
        )}
        <div className={`${styles.container} ${header.color}`}>
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

PlayStatus.defaultProps = {
  isCustom: false,
  isSolo: false
};

export default PlayStatus;
