/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import styles from './index.module.css';
import { useSelector } from 'react-redux';

const states = {
  room: 'ROOM',
  game: 'GAME'
};

const PlayStatus = (props) => {
  const { gameboard } = props;
  const socket = useSelector((state) => state.game.socket);
  const room = useSelector((state) => state.game.room);
  const [state, setState] = useState(states.room);
  const [header, setHeader] = useState({
    color: '#469cd0',
    text: 'Connecting to server...'
  });

  useEffect(() => {
    const { roomTime } = room;
    const { gameTime, isStarted, isOver } = gameboard;

    const getTime = (currentState) => {
      switch (currentState) {
        case states.room:
          if (roomTime) {
            const seconds = roomTime.substring(roomTime.length - 2, roomTime.length);
            const time = parseInt(seconds, 0);
            if (time <= 0) {
              setState(states.game);
            }
            return time;
          }
          return null;
        case states.game:
          if (gameTime) {
            const minutes = gameTime.substring(1, 2);
            const seconds = gameTime.substring(gameTime.length - 2, gameTime.length);
            return parseInt(seconds, 0) + parseInt(minutes, 0) * 60;
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

        return isStarted
          ? { color: '#81C784', text: 'GO!' }
          : { color: '#469cd0', text: 'Looking for Players...' };
      }

      return { color: '#81C784', text: 'Calc' };
    };

    setHeader(updateHeader());
  }, [gameboard, state, socket, room, setHeader]);

  return (
    <div className={styles.root}>
      <div className={styles.container} style={{ backgroundColor: header.color }}>
        <h3>{gameboard.gameTime || room.roomTime}</h3>
        <h3>{header.text}</h3>
      </div>
    </div>
  );
};

export default PlayStatus;
