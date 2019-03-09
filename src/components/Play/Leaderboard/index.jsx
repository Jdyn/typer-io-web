import React from "react";
import withStyles from "react-jss";
import PropTypes from "prop-types";
import LeaderboardDisplay from "./LeaderboardDisplay";
import Header from "../../reusable/Header";

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
        boxShadow="0 5px 20px rgba(35,35,80,.25)"
        borderRadius="8px 8px 0px 0px"
        margin="0px 0px -8px 0px"
        fontSize={24}
        height="60px"
        backgroundColor={"#555abf"}
        padding="10px 10px 0px 10px"
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
    margin: 0, //"10px 10px 10px 10px",
    gridRow: props.isSolo ? "2 / 5" : "3 / 5",
    gridColumn: props.isSolo ? "3 / 4": "1 / 2"
  })
};

Leaderboard.propTypes = propTypes;

export default withStyles(styles, { injectTheme: true })(Leaderboard);
