import React from "react";
import injectSheet from "react-jss";

const SnippetLetter = props => {
  const { classes, letter } = props;

  switch (letter) {
    case "'":
    case "’":
    case ".":
    case ",":
    case "-":
      return <span className={classes.punctuation} />;
    default:
      return <span className={classes.letter} />;
  }
};

const styles = theme => ({
  letter: {
    width: "20px",
    height: "20px",
    position: "relative",
    backgroundColor: props => (props.color ? props.color : theme.primaryGrey)
  },
  punctuation: {
    width: "10px",
    height: "20px",
    position: "relative",
    backgroundColor: theme.primaryGrey
  }
});

export default injectSheet(styles)(SnippetLetter);
