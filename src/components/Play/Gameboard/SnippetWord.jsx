import React from "react";
import withStyles from "react-jss";

const SnippetWord = props => {
  const { word, classes } = props;

  return <div className={classes.container}>{word}</div>;
};

const styles = theme => ({
  container: props => ({
    margin: "6.5px 1px 6.5px 14px",
    position: "relative",
    color: props.isComplete ? "black" : "transparent",
    paddingLeft: "8px",
    maxHeight: "20px",
    boxSizing: "content-box",
    userSelect: "none",
    transitionDuration: "0.3s",
    boxShadow: props.isComplete ? "none" : "0px 2px 2px rgba(50,50,93,.25)",
    letterSpacing: "2px",
    backgroundColor: props.isComplete ? "transparent" : theme.primaryGrey,
    borderRadius: "4px"
  })
});

export default withStyles(styles)(SnippetWord);
