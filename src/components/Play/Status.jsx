import React, { useState, useEffect } from 'react';
import withStyles from 'react-jss';

const states = {
  room: 'ROOM',
  game: 'GAME'
};

const PlayStatus = props => {
  const { classes, gameboard, room, socket } = props;
  const [state, setState] = useState(states.room);
  const [header, setHeader] = useState({
    color: '#469cd0',
    text: 'Connecting to server...'
  });

  useEffect(() => {
    const { roomTime } = room;
    const { gameTime, isStarted, isOver } = gameboard;

    const getTime = currentState => {
      switch (currentState) {
        case states.room:
          if (roomTime) {
            const seconds = roomTime.substring(roomTime.length - 2, roomTime.length);
            const time = parseInt(seconds);
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
    <div className={classes.container}>
      <div className={classes.inner} style={{ backgroundColor: header.color }}>
        <h3>{gameboard.gameTime || room.roomTime}</h3>
        <h3>{header.text}</h3>
      </div>
    </div>
  );
};

const styles = theme => ({
  container: {
    position: 'relative',
    gridArea: 'status',
    marginBottom: '15px',
    zIndex: 100,
    height: '115px',
    maxHeight: '115px'
  },
  inner: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    height: '100%',
    fontSize: '18px',
    color: theme.primary,
    boxShadow: '0px 5px 10px 0px rgba(30,30,70,.3)',
    borderRadius: 16,
    border: '3px solid rgba(0,0,0,.1)',
    transition: 'background-color 0.5s',
    padding: '30px 0px',
    textAlign: 'center',
    '& h3': {
      margin: 0,
      fontSize: 20,
      height: '25px',
      lineHeight: '25px',
      fontWeight: 600
    }
  }
});

export default withStyles(styles)(PlayStatus);
