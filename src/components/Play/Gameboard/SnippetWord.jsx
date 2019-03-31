import React from "react";
import withStyles from "react-jss";

const SnippetWord = props => {
  const { word, classes } = props;

  return <div className={classes.container}>{word}</div>;
};

const styles = theme => ({
  container: props => ({
    margin: props.isComplete ? "6px 0px 6px 0px" : "6.5px 1px 6.5px 14px",
    position: "relative",
    fontSize: 20,
    lineHeight: "21px",
    color: props.isComplete ? "black" : "transparent",
    paddingLeft: props.isComplete ? "10px" : "30px",
    height: "20px  ",
    boxSizing: "content-box",
    userSelect: "none",
    transitionDuration: "0.1s",
    boxShadow: props.isComplete ? "none" : "0px 2px 2px rgba(50,50,93,.25)",
    letterSpacing: "none",
    backgroundColor: props.isComplete ? "transparent" : theme.grey,
    borderRadius: "4px"
  })
});

export default withStyles(styles)(SnippetWord);
