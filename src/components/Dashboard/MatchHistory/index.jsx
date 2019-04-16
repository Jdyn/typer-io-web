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
  const { classes } = props;

  return (
    <div className={classes.container}>
      <Banner>News</Banner>
      <div className={classes.wrapper}>
        <h2>Demo Released</h2>
        <p>
          Hello, thank you for checking out this early demo. Some features are currently disabled,
          see below.
        </p>
        <h3>
          <b>Disabled features:</b>
        </h3>
        <div className={classes.list}>
          <ul>
            <li>Match History</li>
            <li>Private Matches</li>
            <li>Discussions</li>
            <li>Leaderboards</li>
          </ul>
          <ul>
            <li>Accounts</li>
          </ul>
        </div>
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
    margin: 0,
    maxWidth: "475px",
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
    padding: "30px",
    overflowY: "auto",
    overflowX: "hidden",
    flexGrow: 1,
    color: theme.color,
    "& *": {
      margin: 0,
      marginBottom: "15px"
    }
  },
  list: {
    color: theme.color,
    display: "flex",
    flexDirection: "row",
    "& ul": {
      paddingLeft: "25px",
      margin: 0,
      "& li": {
        margin: 0
      }
    }
  }
});

export default withStyles(styles)(MatchHistory);

// warning: {
//   display: "flex",
//   height: "130px",
//   justifyContent: "center",
//   margin: "25px 0 0 0",
//   gridArea: "warning",
//   "& div": {
//     display: "flex",
//     backgroundColor: theme.primary,
//     borderRadius: 10,
//     padding: "15px",
//     width: "100%",
//     textAlign: "center",
//     boxShadow: "0px 1px 10px -1px rgba(50,50,93,.3)",
// "& ul": {
//   margin: 0,
//   width: "200px",
//   textAlign: "left"
// }
//   }
// }
