import React from "react";
import injectSheet from "react-jss";
import SnippetLetter from "./SnippetLetter";

const SnippetWord = props => {
  const { word, classes } = props;

  return (
    <div className={classes.container}>
      {word}
      {/* {word.map((letter, index) => (
        <SnippetLetter key={index} letter={letter} />
      ))} */}
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
    "&:first-child": {
      borderRadius: "4px 0px 0px 4px"
    },
    "&:last-child": {
      borderRadius: "0px 4px 4px 0px"
    },
    "&:only-child": {
      borderRadius: "4px 4px 4px 4px"
    }
  }
});

export default injectSheet(styles)(SnippetWord);
