import React from "react";
import withStyles from "react-jss";
import PropTypes from "prop-types";
import LeaderboardDisplay from "./LeaderboardDisplay";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const Leaderboard = props => {
  const { classes, theme } = props;
  return (
    <div className={classes.container}>
      <LeaderboardDisplay></LeaderboardDisplay>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "10px",
    gridRow: "3 / 5",
    gridColumn: "1 / 2"
  }
};

Leaderboard.propTypes = propTypes;

export default withStyles(styles, { injectTheme: true })(Leaderboard);
