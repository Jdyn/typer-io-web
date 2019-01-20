import React from "react";
import withStyles from "react-jss";

const SnippetWord = props => {
  const { word, classes } = props;

  return (
    <div className={classes.container}>
      {word}
    </div>
  );
};

const styles = theme => ({
  container: {
    margin: "6.5px 0px 6.5px 14px",
    position: "relative",
    color: "transparent",
    paddingLeft: "8px",
    maxHeight: "20px",
    boxSizing: "content-box",
    userSelect: "none",
    letterSpacing: "5px",
    backgroundColor: props => (props.color ? props.color : theme.primaryGrey),
    borderRadius: "4px",
  }
});

export default withStyles(styles)(SnippetWord);
