import React from "react";
import injectSheet from "react-jss";
import SnippetLetter from "./SnippetLetter";

const SnippetWord = props => {
  const { letters, classes } = props;

  return (
    <div className={classes.container}>
      {letters.map((letter, index) => (
        <SnippetLetter letter={letter} key={index} />
      ))}
    </div>
  );
};

const styles = theme => ({
  container: {
    display: "flex",
    margin: "15px 15px 0px 0px",
    position: "relative",
  }
});

export default injectSheet(styles)(SnippetWord);
