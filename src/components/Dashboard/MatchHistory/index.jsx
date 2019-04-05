import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import Banner from "../../reusable/Banner";
// import Match from "./Match";

const propTypes = {
  classes: PropTypes.object.isRequired,
  deleteMatch: PropTypes.func.isRequired,
  matches: PropTypes.array
};

const MatchHistory = props => {
  const { classes, matches } = props;

  return (
    <div className={classes.container}>
      <Banner>Match History</Banner>
      <div className={classes.wrapper}>
        {/* {matches.length > 0 ? (
          matches.map((match, index) => (
            <div key={index} >{match.title}{" "}{match.wpm}</div>
            // <Match key={index} match={match} index={index} deleteMatch={deleteMatch} />
          ))
        ) : (
          <span>Complete a match to make history</span>
        )} */}
      </div>
    </div>
  );
};

MatchHistory.propTypes = propTypes;

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    gridArea: "matchHistory",
    width: "100%",
    margin: 0,
    borderRadius: 10,
    backgroundColor: theme.white,
    boxShadow: "0 50px 100px -20px rgba(50,50,93,.25), 0 30px 30px -10px rgba(0,0,0,.3)",
    "@media (min-width: 750px)": {
      marginLeft: "auto"
    }
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    flexGrow: 1,
    zIndex: 101,
    borderRadius: 10,
    "& span": {
      textAlign: "center",
      margin: "100px 0",
      color: "#8E8D8F"
    }
  }
});

export default withStyles(styles)(MatchHistory);
