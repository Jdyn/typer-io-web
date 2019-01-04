import React from "react";
import injectSheet from "react-jss";

const SnippetLetter = props => {
  const { classes, letter } = props;

  switch (letter) {
    // case "'":
    // case "’":
    // case ".":
    // case ",":
    // case "-":
    //   return <span className={classes.punctuation} />;
    default:
      return <span className={classes.letter} />;
  }
};

const styles = theme => ({
  letter: {
    width: "15px",
    height: "20px",
    position: "relative",
    backgroundColor: props => (props.color ? props.color : theme.primaryGrey),
    "&:first-child": {
      borderRadius: "4px 0px 0px 4px"
    },
    "&:last-child": {
      borderRadius: "0px 4px 4px 0px"
    },
    "&:only-child": {
      borderRadius: "4px 4px 4px 4px"
    }
  },
  punctuation: {
    width: "10px",
    height: "20px",
    position: "relative",
    backgroundColor: theme.primaryGrey,
    "&:first-child": {
      borderRadius: "8px 0px 0px 8px"
    },
    "&:last-child": {
      borderRadius: "0px 8px 8px 0px"
    }
  }
});

export default injectSheet(styles)(SnippetLetter);
