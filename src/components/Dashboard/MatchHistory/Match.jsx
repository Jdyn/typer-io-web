import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import formatTime from "../../../lib/formatTime";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const Match = props => {
  const { classes, match, index, deleteMatch } = props;

  const handleDelete = event => {
    event.preventDefault();
    deleteMatch(index);
  };

  return (
    <div className={classes.container}>
      <span className={classes.title}>{match.title}</span>
      <span className={classes.wpm}>{match.wpm}</span>
      <span className={classes.date}>{formatTime(match.date)}</span>
      {/* <button onClick={e => handleDelete(e)}>delete</button> */}
    </div>
  );
};

const styles = theme => ({
  container: {
    display: "grid",
    gridTemplateRows: "1fr",
    gridTemplateColumns: "195px 1fr 1fr",
    flexDirection: "row",
    position: "relative",
    padding: "12.5px 10px 12.5px 10px",
    borderRadius: 0,
    zIndex: 150,
    width: "100%",
    boxShadow: "inset 0 -1px 0 0 rgba(100,121,143,0.122)",
    cursor: "pointer",
    transitionDuration: ".2s",
    "&:hover": {
      transform: "translateY(-1px)",
      borderRadius: 8,
      boxShadow:
        "inset -1px 0 0 #dadce0, inset -1px 0 0 #dadce0, 0 1px 2px 0 rgba(60,64,67,.3), 0 1px 10px 1px rgba(60,64,67,.15)"
    },
    "&:active": {
      transform: "translateY(2px)"
    }
  },
  item: {
    fontWeight: 400,
    lineHeight: "20px",
    letterSpacing: ".2px",
    whiteSpace: "nowrap"
  },
  title: {
    extend: "item",
    textAlign: "left",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontSize: 17
  },
  wpm: {
    extend: "item",
    margin: 0,
    paddingLeft: "10px",
    fontSize: 17
  },
  place: {
    extend: "item",
    margin: "auto",
    fontSize: 14
  },
  date: {
    extend: "item",
    fontSize: 16,
    color: "#5f6368",
    margin: "0 0 0 auto"
  }
});

Match.propTypes = propTypes;

export default withStyles(styles)(Match);
