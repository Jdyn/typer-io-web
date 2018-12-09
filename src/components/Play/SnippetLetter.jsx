import React from "react";
import injectSheet from "react-jss";

const SnippetLetter = props => {
  const { classes, letter, cord } = props;
  
  switch (letter) {
    case "'","’",",",".",",":
      return <div className={classes.punctuation}></div>;
    default:
      return <span className={classes.letter}></span>;
  }
};

const styles = theme => ({
  letter: {
    width: "1em",
    height: "1em",
    position: "relative",
    backgroundColor: theme.primaryGrey
  },
  punctuation: {
    width: ".5em",
    height: "1em",
    position: "relative",
    backgroundColor: theme.primaryGrey
  },
});

export default injectSheet(styles)(SnippetLetter);
