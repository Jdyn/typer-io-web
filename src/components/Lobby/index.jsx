import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import ClientList from '../Play/ClientList';
import { silentEmit } from '../../services/socket';
import Button from '../reusable/Button';

const propTypes = {
  classes: PropTypes.object.isRequired
};

const Lobby = (props) => {
  const { classes, history, client, room, gameboard, socket, leaveRoom } = props;

  const [form, setForm] = useState({
    isRandom: false,
    isCustom: true,
    allowSpectators: false,
    customQuote: ''
  });

  const currrentClient = useMemo(
    () => room.clients.filter((item) => item.id == client.id)[0] || {}
  );

  const handleStart = () => {
    silentEmit('START_CUSTOM_GAME', {});
  };

  return (
    <main>
      <div className={classes.stripe} />
      <div className={classes.root}>
        <ClientList room={room} gameboard={gameboard} socket={socket} />
        <div></div>
        <div className={classes.container}>
          {room.id ? (
            <>
              <span>Share this link to invite players.</span>
              <div>{`https://typer.io/lobby/${room.id}`}</div>
              {currrentClient.isHost ? (
                <Button margin="10px 0px" onClick={() => handleStart()}>
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
        <div></div>
      </div>
    </main>
  );
};

const styles = (theme) => ({
  root: {
    display: 'grid',
    gridTemplateRow: '1fr',
    gridTemplateColumns: '1fr 2fr 1fr',
    gridTemplateAreas: `
  'clientlist clientlist clientlist'
  `,
    gridGap: '15px',
    padding: '15px',
    maxWidth: '1185px',
    margin: '0px auto 115px auto'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    margin: 0,
    alignItems: 'center',
    padding: '20px',
    borderRadius: 16,
    backgroundColor: theme.white,
    boxShadow: '0 10px 20px 0px rgba(30,30,70,.4)',
    '& span': {
      textAlign: 'center',
      padding: '10px 0px'
    },
    '& div': {
      padding: '10px',
      textAlign: 'center',
      border: `2px solid ${theme.grey}`,
      borderRadius: '16px'
    }
  },

  chat: {
    display: 'flex'
    // gridRow: "1 / 3",
    // gridColumn: "3 / 4"
  },
  option: {
    padding: '10px'
  },
  title: {
    margin: '10px',
    boxShadow: 'inset 0 -1px 0 0 rgba(100,121,143,0.122)'
  },
  spectate: {
    gridRow: '2 / 3',
    gridColumn: '2 / 3',
    padding: '15px',
    borderRadius: 8,
    zIndex: 100,
    border: '1px solid rgba(0,0,0,.05)',
    // boxShadow: "0px 0px 15px rgba(50,50,93,.25)",
    boxShadow: '0 50px 100px -20px rgba(50,50,93,.25), 0 30px 60px -30px rgba(0,0,0,.3)',
    backgroundColor: theme.primaryWhite
  },
  stripe: {
    zIndex: -1,
    width: '100%',
    height: '95%',
    top: -10,
    overflow: 'hidden',
    WebkitTransform: 'skwY(-12deg)',
    transform: 'skewY(-12deg)',
    WebkitTransformOrigin: 0,
    transformOrigin: 0,
    backgroundColor: theme.tertiaryWhite,
    position: 'absolute'
  }
});

Lobby.propTypes = propTypes;

export default withStyles(styles, { injectTheme: true })(Lobby);
