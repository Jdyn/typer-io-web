import React from "react";
import injectSheet from "react-jss";
import SnippetLetter from "./SnippetLetter";

const SnippetWord = props => {
  const { word, classes, wordIndex } = props;

  const changeColor = letterIndex => {
    if (letterIndex === 1 && wordIndex === 0) {
      return
    }

    return;
  };

  return (
    <div className={classes.container}>
      {word.map((letter, letterIndex) => (
        <SnippetLetter
          letter={letter}
          key={letterIndex}
          cord={[wordIndex, letterIndex]}
          color={changeColor(letterIndex)}
        />
      ))}
    </div>
  );
};

const styles = theme => ({
  container: {
    display: "flex",
    margin: "0.7em 0.7em 0px 0px",
    position: "relative",
    // "&:first-child": {
    //   paddingLeft: "px !important"
    // }
  }
});

export default injectSheet(styles)(SnippetWord);
