import React from "react";
import injectSheet from "react-jss";
import SnippetLetter from "./SnippetLetter";

const SnippetWord = props => {
  const { word, classes } = props;

  return (
    <div className={classes.container}>
      {word.map((letter, index) => (
        <SnippetLetter key={index} letter={letter} />
      ))}
    </div>
  );
};

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "row",
    margin: "6.5px 0px 6.5px 0px",
    position: "relative",
    paddingLeft: "12px",
    maxHeight: "20px",
    boxSizing: "content-box",

  }
});

export default injectSheet(styles)(SnippetWord);
