import React, { useState } from 'react';
import withStyles from 'react-jss';
import PropTypes from 'prop-types';
import MenuCard from './MenuCard';

const propTypes = {
  classes: PropTypes.object.isRequired,
  socket: PropTypes.object.isRequired,
  initSocket: PropTypes.func.isRequired
};

const cards = [
  {
    title: 'Quick Play',
    text: 'Play against others',
    color: '#6772e5',
    route: '/play'
  },
  {
    title: 'Solo Play',
    text: 'Practice on your own',
    color: '#3ecf8e',
    route: '/solo'
  },
  {
    title: 'Friends',
    text: 'Create a private match',
    color: '#DC6AC8',
    route: '/lobby'
  }
];

const DashboardMenu = props => {
  const { classes, initSocket, socket, client, session } = props;
  const [currentIndex, set] = useState(null);

  const handleOnClick = (event, index) => {
    event.preventDefault();

    const token = session.token || null;
    const username = client.username || session.username;

    if (!socket.pending) {
      if (!socket.connected) {
        switch (index) {
          case 0:
            set(index);
            return initSocket({ username, token }, { mode: 'MULTIPLAYER' });
          case 1:
            set(index);
            return initSocket({ username, token }, { mode: 'SOLO' });
          case 2:
            set(index);
            return initSocket({ username, token }, { mode: 'CUSTOM' });
          default:
            break;
        }
      }
    }
  };

  return (
    <div className={classes.container}>
      {cards.map((card, index) => {
        return (
          <MenuCard
            key={index}
            index={index}
            onClick={handleOnClick}
            currentIndex={currentIndex}
            card={card}
            socket={socket}
          />
        );
      })}
    </div>
  );
};

DashboardMenu.propTypes = propTypes;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gridArea: 'menu',
    minWidth: '275px'
  }
};

export default withStyles(styles)(DashboardMenu);
