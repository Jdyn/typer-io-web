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
        Match History
      </Header>
      <div className={classes.categories}>
        <span className={classes.titleCategory}>Title</span>
        <span className={classes.wpmCategory}>wpm</span>
        <span className={classes.category}>Time</span>
      </div>
      <div className={classes.inner}>
        {matches.length > 0 ? (
          matches.map((match, index) => (
            <Match
              key={index}
              match={match}
              index={index}
              deleteMatch={deleteMatch}
            />
          ))
        ) : (
          <div className={classes.empty}>Complete a match to make history</div>
        )}
      </div>
    </div>
  );
};

MatchHistory.propTypes = propTypes;

const styles = theme => ({
  container: {
    position: "relative",
    width: "400px",
    maxWidth: "435px",
    height: "456px",
    maxHeight: "456px",
    marginLeft: "auto",
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
    height: "397px",
    position: "relative",
    maxHeight: "350px",
    overflowX: "hidden",
    overflowY: "auto",
    padding: "0px 10px 10px 10px",
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
  empty: {
    textAlign: "center",
    margin: "100px 0",
    color: "#8E8D8F"
  },
  categories: {
    display: "grid",
    gridTemplateColumns: "195px min-content 1fr",
    gridTemplateRows: "1fr",
    padding: "10px",
    zIndex: 10,
    boxShadow: "inset 0 -1px 0 0 rgba(100,121,143,0.122)",
    marginLeft: "10px",
    marginRight: "10px"
  },
  category: {
    margin: "0",
    fontSize: 16,
    zIndex: 0,
    letterSpacing: "0.025em",
    fontWeight: 600,
    textTransform: "uppercase",
    color: "#8E8D8F",
    textAlign: "center"
  },
  titleCategory: {
    extend: "category",
    width: "195px"
  },
  wpmCategory: {
    extend: "category",
    margin: 0
  }
});

export default withStyles(styles, { injectTheme: true })(MatchHistory);
