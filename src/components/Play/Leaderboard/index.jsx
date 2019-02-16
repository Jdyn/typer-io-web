import React from "react";
import withStyles from "react-jss";
import PropTypes from "prop-types";
import LeaderboardDisplay from "./LeaderboardDisplay";
import Header from "../../Common/Header";

const propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  isSolo: PropTypes.bool
};

const Leaderboard = props => {
  const { classes, theme } = props;
  return (
    <div className={classes.container}>
      <Header
        color={theme.primaryWhite}
        borderRadius="8px 8px 0px 0px"
        margin="0px 0px -8px 0px"
        boxShadow="0 1px 40px rgba(50,50,93,.25)"
        fontSize={24}
        height="64px"
        backgroundColor={"#555abf"}
        padding="10px 10px 10px 10px"
      >
        Leaderboard
      </Header>
      <LeaderboardDisplay />
    </div>
  );
};

const styles = {
  container: props => ({
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    position: "relative",
    margin: "0px 10px 10px 10px",
    gridRow: "3 / 5"
  })
};

Leaderboard.propTypes = propTypes;

export default withStyles(styles, { injectTheme: true })(Leaderboard);
