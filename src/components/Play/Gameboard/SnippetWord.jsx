import React from "react";
import injectSheet from "react-jss";
import SnippetLetter from "./SnippetLetter";
import GamePiece from "./GamePiece";

const SnippetWord = props => {
  const { word, classes, currentWordIndex, wordIndex } = props;

  return (
    <div className={classes.container}>
      {currentWordIndex === wordIndex ? <GamePiece /> : null}
      {word.map((letter, index) => (
        <SnippetLetter key={index}/>
      ))}
    </div>
  );
};

const styles = theme => ({
  container: {
    display: "flex",
    margin: "6.5px 0px 6.5px 0px",
    paddingRight: "12px",
    position: "relative",
    maxHeight: "20px"
  }
});

export default injectSheet(styles)(SnippetWord);
