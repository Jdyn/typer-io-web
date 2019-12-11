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
        <h2>This is a Demo.</h2>
        <span>updated {formatTime(1570494746858)}</span>
        <p>
          UPDATE: I've turned off the servers for the foreseeable future while I find the time to work on the project more. I would keep it up, but
          there are small server costs that aren't worth it. If you want to test it, you can contact me and we
          can play together. Are you faster than me?
          <br></br>
          <br></br>
          Thanks for taking a look.
        </p>
        <h3>
          <b>Disabled features:</b>
        </h3>
        <div className={classes.list}>
          <ul>
            <li>Individual Match History</li>
            <li>Private Matches</li>
          </ul>
        </div>
        <h3>Latest Fixes:</h3>
        <div className={classes.list}>
          <ul>
            <li>
              Continuing to type after the game ends should not cause a crash.
            </li>
            <li>
              All bodies of text in the forums should no longer stretch the layout.
            </li>
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
      width: "8px",
      height: "16px"
      // backgroundColor: "#ddd"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#b4b4b4",
      borderRadius: 16,
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,.2)"
    },
    "&::-webkit-scrollbar-track": {
      // backgroundColor: theme.primary,
      // webkitBoxShadow: "inset 0 0 6px transparent",
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
