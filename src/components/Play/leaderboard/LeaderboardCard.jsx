import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';

const propTypes = {
  classes: PropTypes.object.isRequired
};

const LeaderboardCard = (props) => {
  const { classes, card } = props;
  return (
    <div className={classes.container}>
      <div className={classes.portrait} />
      <div className={classes.wrapper}>
        <span className={classes.username}>
          {card.user?.isAdmin && <span>Admin</span>}
          {card.user?.username || card.nickname}
        </span>
        <span className={classes.timestamp}>{card.created_at}</span>
      </div>
      <div className={classes.wpm}>
        <span>{card.wpm} WPM</span>
      </div>
    </div>
  );
};

const styles = (theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    borderBottom: '2px solid #e5e5e5',
    padding: '12px 12px 12px 24px'
  },
  wrapper: {
    display: 'flex',
    // alignItems: "center",
    flexDirection: 'column',
    '& span': {
      display: 'flex'
    }
  },
  username: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontSize: 17,
    fontWeight: 700,
    '& span': {
      padding: '3px 5px',
      color: theme.white,
      borderRadius: '8px',
      fontSize: 14,
      marginRight: '5px',
      backgroundColor: theme.red
    }
  },
  timestamp: {
    fontSize: 14,
    color: theme.secondaryColor
  },
  portrait: {
    position: 'relative',
    width: '46px',
    height: '46px',
    borderRadius: '50%',
    border: '3px solid #e5e5e5',
    margin: '-3px 10px -3px -3px',
    '& span': {
      textAlign: 'center'
    }
  },
  wpm: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    color: theme.secondaryColor,
    flexGrow: 1,
    fontSize: 14,
    fontWeight: 500
  }
});

LeaderboardCard.propTypes = propTypes;

export default withStyles(styles)(LeaderboardCard);
