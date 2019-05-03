import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import Banner from "../../reusable/Banner";
import formatTime from "../../../lib/formatTime"

const propTypes = {
  classes: PropTypes.object.isRequired,
  matches: PropTypes.array
};

const News = props => {
  const { classes } = props;

  return (
    <div className={classes.container}>
      <Banner>News</Banner>
      <div className={classes.wrapper}>
        <h2>Demo Release</h2>
        <span>updated {formatTime(1556905192689)}</span>
        <p>
          Thank you for taking a look at this demo. Some features are currently disabled,
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
        Public forums and leaderboards are the primary focus right now and are actively
        being developed. <br />
        Forums soon™
      </div>
    </div>
  );
};

News.propTypes = propTypes;

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    gridArea: "matchHistory",
    margin: 0,
    padding: "24px",
    borderRadius: 16,
    backgroundColor: theme.white,
    boxShadow: "0 10px 20px 0px rgba(30,30,70,.4)"
    // "@media (min-width: 750px)": {
    //   marginLeft: "auto"
    // }
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    overflowX: "hidden",
    // flexGrow: 1,
    color: theme.color,
    "& p, h3, div, span": {
      margin: 0,
      marginBottom: "15px"
    },
    "& h2": {
      margin: 0,
      marginBottom: "5px"
    },
    "& span": {
      fontSize: "14px",
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

export default withStyles(styles)(News);

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
