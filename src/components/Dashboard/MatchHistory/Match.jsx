import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const Match = props => {
  const { classes, match, index } = props;
  return (
    <div className={classes.container}>
      <span>{index}</span>
      <span>{match.title}</span>
      <span>{match.wpm}wpm</span>
      <span>{match.place}</span>
    </div>
  );
};

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "45px",
    padding: "10px 0px 10px 0px",
    borderBottom: `solid 2px ${theme.divider}`,
    backgroundColor: theme.primaryWhite,
    margin: "0 0",
    fontSize: 16
  }
});

Match.propTypes = propTypes;

export default withStyles(styles)(Match);
