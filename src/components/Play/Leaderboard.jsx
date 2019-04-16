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
      <ul className={classes.categories}>
        <li className={classes.category}>
          <span>week</span>
        </li>
        <li className={classes.category}>
          <span>month</span>
        </li>
        <li className={classes.category}>
          <span>all time</span>
        </li>
      </ul>
    </div>
  );
};

const styles = theme => ({
  container: props => ({
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    position: "relative",
    gridArea: "leaderboard",
    boxShadow: "0px 10px 50px 0px rgba(30,30,70,.3)",
    borderRadius: 16,
    // height: "425px",
    padding: "24px",
    backgroundColor: theme.white
  }),
  categories: {
    display: "flex",
    position: "relative",
    margin: 0,
    padding: 0,
    marginTop: "15px",
    marginLeft: "-24px",
    width: "calc(100% + 48px)"
  },
  category: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "center",
    textTransform: "uppercase",
    letterSpacing: ".8px",
    fontSize: "15px",
    fontWeight: 700,
    position: "relative",
    listStyle: "none",
    cursor: "pointer",
    paddingBottom: "10px",
    color: theme.secondaryColor,
    borderBottom: "2px solid #e5e5e5",
    "&:first-child": {
      paddingLeft: "10px"
    },
    "&:last-child": {
      paddingRight: "10px"
    },
    "& span": {
      display: "flex",
      justifyContent: "center"
    }
  }
});

Leaderboard.propTypes = propTypes;

export default withStyles(styles)(Leaderboard);
