import React from "react";
import injectSheet from "react-jss";

const SnippetLetter = props => {
  const { classes, letter } = props;
  switch (letter) {
    // case ",",".",",":
    //   return <div className={classes.groundedPoint} />;
    // case "'", "’":
    //   return <div className={classes.floatingPoint} />;
    default:
      return <div className={classes.letter}></div>;
  }
};

const styles = theme => ({
  letter: {
    width: "1em",
    height: "1em",
    position: "relative",
    backgroundColor: theme.primaryGrey
  },
  groundedPoint: {
    width: ".5em",
    height: ".5em",
    position: "relative",
    padding: "0px",
    margin: "auto 1px 0px 1px",
    backgroundColor: theme.primaryGrey
  },
  floatingPoint: {
    width: ".5em",
    height: ".5em",
    position: "relative",
    padding: "0px",
    margin: "0px .1em auto .1em",
    backgroundColor: theme.primaryGrey
  }
});

export default injectSheet(styles)(SnippetLetter);
