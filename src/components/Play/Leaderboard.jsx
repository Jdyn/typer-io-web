import React from "react";
import withStyles from "react-jss";
import PropTypes from "prop-types";
import Banner from "../reusable/Banner";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const Leaderboard = props => {
  const { classes } = props;
  return (
    <div className={classes.container}>
      <Banner>Leaderboard</Banner>
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
    margin: 0,
    gridArea: "leaderboard"
  }),
  inner: {
    display: "flex",
    flexGrow: 1,
    backgroundColor: theme.white,
    boxShadow: "0px -5px 15px 0px rgba(30,30,73,.3) inset",
    borderRadius: "0 0 8px 8px",
    border: "2px solid rgb(0,0,0,.1)",
    borderTop: "none",
    zIndex: 100
  }
});

Leaderboard.propTypes = propTypes;

export default withStyles(styles)(Leaderboard);
