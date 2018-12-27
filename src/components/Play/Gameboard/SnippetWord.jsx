import React from "react";
import injectSheet from "react-jss";
import SnippetLetter from "./SnippetLetter";

const SnippetWord = props => {
  const { word, classes, wordIndex } = props;

  const changeColor = letterIndex => {
    if (letterIndex === 1 && wordIndex === 0) {
      return;
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
    margin: "6.5px 0.7em 6.5px 0px",
    position: "relative",
    maxHeight: "20px"
    // "&:first-child": {
    //   paddingLeft: "px !important"
    // }
  }
});

export default injectSheet(styles)(SnippetWord);
