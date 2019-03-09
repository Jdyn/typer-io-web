import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import Header from "../../reusable/Header";
import Match from "./Match";

const propTypes = {
  classes: PropTypes.object.isRequired,
  deleteMatch: PropTypes.func.isRequired,
  matches: PropTypes.array
};

const MatchHistory = props => {
  const { classes, matches, deleteMatch } = props;

  return (
    <div className={classes.container}>
      <Header>Match History</Header>
      <div className={classes.wrapper}>
        {/* {matches.length > 0 ? (
          matches.map((match, index) => (
            <Match key={index} match={match} index={index} deleteMatch={deleteMatch} />
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
    position: "relative",
    flexDirection: "column",
    gridArea: "matchHistory",
    width: "100%",
    margin: 0,
    backgroundColor: theme.primaryWhite,
    boxShadow: "0 50px 100px -20px rgba(50,50,93,.25), 0 30px 60px -30px rgba(0,0,0,.3)",
    borderRadius: 8,
    "@media (min-width: 750px)": {
      marginLeft: "auto"
    },
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    flexBasis: "400px",
    "& span": {
      textAlign: "center",
      margin: "100px 0",
      color: "#8E8D8F"
    }
  }
});

export default withStyles(styles)(MatchHistory);
