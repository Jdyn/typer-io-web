import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import theme from "../../../lib/theme";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const LeaderboardCard = props => {
  const { classes, card } = props;
  return (
    <div className={classes.container}>
      <div className={classes.portrait} />
      <div className={classes.wrapper}>
        <span className={classes.username}>{card.user.username}</span>
        <span className={classes.timestamp}>{card.created_at}</span>
      </div>
      <div className={classes.wpm}>
        <span>{card.wpm} WPM</span>
      </div>
    </div>
  );
};

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "row",
    position: "relative",
    borderBottom: "2px solid #e5e5e5",
    padding: "12px 12px 12px 24px"
  },
  wrapper: {
    display: "flex",
    // alignItems: "center",
    flexDirection: "column",
    "& span": {
      display: "flex"
    }
  },
  username: {
    fontSize: 17,
    fontWeight: 700
  },
  timestamp: {
    fontSize: 16,
    color: theme.secondaryColor
  },
  portrait: {
    position: "relative",
    width: "46px",
    height: "46px",
    borderRadius: "50%",
    border: "3px solid #e5e5e5",
    margin: "-3px 10px -3px -3px"
  },
  wpm: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    color: theme.secondaryColor,
    flexGrow: 1,
    fontSize: 16,
    fontWeight: 500
  }
});

LeaderboardCard.propTypes = propTypes;

export default withStyles(styles)(LeaderboardCard);
