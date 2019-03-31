import React from "react";
import withStyles from "react-jss";
import PropTypes from "prop-types";
import Header from "../reusable/Header";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const Leaderboard = props => {
  const { classes } = props;
  return (
    <div className={classes.container}>
      <Header>Leaderboard</Header>
      <div className={classes.inner} />
    </div>
  );
};

const styles = theme => ({
  container: props => ({
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    position: "relative",
    margin: "0 0 30px 0",
    gridArea: "leaderboard"
  }),
  inner: {
    display: "flex",
    flexGrow: 1,
    backgroundColor: theme.white,
    boxShadow: "0px 0px 25px 0px rgba(50,50,93,.3) inset",
    borderRadius: "0 0 8px 8px",
    zIndex: 150
  }
});

Leaderboard.propTypes = propTypes;

export default withStyles(styles)(Leaderboard);
