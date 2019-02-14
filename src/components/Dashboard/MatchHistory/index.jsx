import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import Header from "../../Common/Header";
import Match from "./Match";

const propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const MatchHistory = props => {
  const { classes, theme, matches } = props;

  // const matches = [
  //   {
  //     title: "Sonnet 27",
  //     wpm: "85",
  //     date: Date.now(),
  //     position: "1st"
  //   },
  //   {
  //     title: "Sonnet 26",
  //     wpm: "100",
  //     date: Date.now(),
  //     position: "2nd"
  //   }
  // ];

  return (
    <div className={classes.container}>
      <Header
        boxShadow="0 5px 20px rgba(35,35,80,.25)"
        color={theme.primaryWhite}
        borderRadius="8px 8px 0px 0px"
        fontSize={24}
        backgroundColor={"#555abf"} //"#f7bb10"
        padding="10px"
      >
        History
      </Header>
      <div className={classes.inner}>
        {matches.map((match, index) => (
          <Match key={index} match={match} index={index + 1} />
        ))}
      </div>
    </div>
  );
};

MatchHistory.propTypes = propTypes;

const styles = theme => ({
  container: {
    position: "relative",
    width: "400px",
    margin: "15px 20px 40px auto",
    borderRadius: 8,
    backgroundColor: theme.primaryWhite,
    boxShadow:
      "0 50px 100px -20px rgba(50,50,93,.25), 0 30px 60px -30px rgba(0,0,0,.3)",
    "&:hover": {
      transform: "translateY(-1px)"
    },
    transitionDuration: ".2s"
  },
  inner: {
    display: "flex",
    flexDirection: "column",
    margin: "10px"
  }
});

export default withStyles(styles, { injectTheme: true })(MatchHistory);
