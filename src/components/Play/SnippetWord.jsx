import React from "react";
import injectSheet from "react-jss";
import SnippetLetter from "./SnippetLetter";

const SnippetWord = props => {
  const { word, classes, wordIndex } = props;

  const changeColor = () => {
    
  }

  return (
    <div className={classes.container}>
      {word.map((letter, letterIndex) => (
        <SnippetLetter letter={letter} key={letterIndex} cord={[wordIndex, letterIndex]} color={changeColor} />
      ))}
    </div>
  );
};

const styles = theme => ({
  container: {
    display: "flex",
    margin: "15px 0.7em 0px 0px",
    position: "relative",
  }
});

export default injectSheet(styles)(SnippetWord);
