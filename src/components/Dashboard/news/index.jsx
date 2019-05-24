import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import Banner from "../../reusable/Banner";
import formatTime from "../../../lib/formatTime";

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
        <p>
          Public forums and leaderboards are the primary focus right now and are actively
          being developed. <br />
          Forums soon™
        </p>

        <h3>Hot Fixes:</h3>
        <div className={classes.list}>
          <ul>
            <li>Errors are now tracked properly</li>
            <li>Text no longer shifts when encountering certain characters.</li>
            <li>
              Correct font is displayed on devices shipped without Sogue UI by default.
            </li>
            <li>Menu button style slightly updated.</li>
            <li>Clearer warning when attempting to create a private match.</li>
          </ul>
        </div>
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
    padding: "20px",
    borderRadius: 16,
    backgroundColor: theme.white,
    boxShadow: "0 10px 20px 0px rgba(30,30,70,.4)"
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    overflowX: "hidden",
    color: theme.color,
    height: "365px",
    border: "2px solid #e5e5e5",
    borderRadius: 16,
    padding: "10px",
    "& p, h3, div, span": {
      margin: 0,
      marginBottom: "15px",
      fontSize: 16
    },
    "& h2": {
      margin: 0,
      fontSize: 24,
      marginBottom: "5px"
    },
    "& span": {
      fontSize: "14px"
    },
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
  list: {
    color: theme.color,
    // display: "flex",
    position: "relative",
    // flexDirection: "row",
    maxWidth: "85%",
    "& ul": {
      paddingLeft: "25px",
      margin: 0,
      "& li": {
        margin: 0,
        padding: "2px"
      }
    }
  }
});

export default withStyles(styles)(News);
