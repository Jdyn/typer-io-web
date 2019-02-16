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
  const { classes, theme, matches, deleteMatch } = props;

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
      <div className={classes.categories}>
        <span className={classes.category}>Title</span>
        <span className={classes.category}>wpm</span>
        <span className={classes.category}>Place</span>
        <span className={classes.category}>Time</span>
      </div>
      <div className={classes.inner}>
        {matches.map((match, index) => (
          <Match
            key={index}
            match={match}
            index={index}
            deleteMatch={deleteMatch}
          />
        ))}
        {/* <div className={classes.box} /> */}
      </div>
      {/* <div className={classes.box} /> */}
    </div>
  );
};

MatchHistory.propTypes = propTypes;

const styles = theme => ({
  container: {
    position: "relative",
    width: "435px",
    maxWidth: "435px",
    margin: "15px 20px 40px auto",
    borderRadius: 8,
    backgroundColor: theme.primaryWhite,
    transitionDuration: ".2s",
    overflow: "hidden",
    "&:hover": {
      transform: "translateY(-1px)"
    },
    boxShadow:
      "0 50px 100px -20px rgba(50,50,93,.25), 0 30px 60px -30px rgba(0,0,0,.3)"
  },
  inner: {
    height: "396px",
    position: "relative",
    // width: "100%",
    maxHeight: "350px",
    overflowX: "hidden",
    overflowY: "auto",
    margin: "0px 5px 5px 5px",
    padding: "0px 5px 5px 5px",
    // scrollbarWidth: "none",
    // msOverflowStyle: "none",
    "&::-webkit-scrollbar": {
      width: "10px",
      height: "16px"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,0.2)"
    },
    "&::-webkit-scrollbar-button": {
      width: "0",
      height: "0",
      display: "none"
    }
  },
  box: {
    height: "20px",
    width: "100%"
  },
  categories: {
    display: "grid",
    gridTemplateColumns: "195px 1fr 1fr 110px",
    gridTemplateRows: "1fr",
    padding: "10px 10px 10px 10px",
    boxShadow: "inset 0 -1px 0 0 rgba(100,121,143,0.122)",
    marginLeft: "10px",
    marginRight: "10px"
  },
  category: {
    margin: "auto",
    fontSize: 16,
    letterSpacing: "0.025em",
    fontWeight: 600,
    // textTransform: "uppercase",
    color: theme.fontColor
  }
});

export default withStyles(styles, { injectTheme: true })(MatchHistory);
