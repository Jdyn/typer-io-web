import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const Word = props => {
  const { classes, word, index, currentIndex, currentWord, input, isHidden, isComplete } = props;

  const [splitWord] = useState(word.split(""));
  const [wrongIndex, set] = useState(null);

  useEffect(() => {
    set(null);
  }, [currentWord]);

  useEffect(() => {
    if (currentWord) {
      if (input === currentWord.substring(0, input.length)) {
        set(null);
      }
    }
  }, [input]);

  const validateLetter = index => {
    const text = input.split("");
    if (text[index]) {
      if (text[index] === splitWord[index]) {
        if (wrongIndex) {
          if (wrongIndex < index) {
            return "#e57373";
          }
        }
        return "#06a978";
      } else {
        if (index < wrongIndex || wrongIndex === null) {
          set(index);
        }
        return "#e57373";
      }
    }
    return "#555abf";
  };

  return currentIndex === index ? (
    <div className={classes.currentWord}>
      {splitWord.map((letter, index) => (
        <span
          key={index}
          className={classes.letter}
          style={{
            backgroundColor: validateLetter(index)
          }}
        >
          {letter}
        </span>
      ))}
    </div>
  ) : isHidden ? (
    <div className={classes.word}>{word}</div>
  ) : isComplete ? (
    <div className={classes.word}>{word}</div>
  ) : (
    <div className={classes.word}>{word}</div>
  );
};

const styles = theme => ({
  currentWord: props => ({
    margin: "0 1.5px",
    fontSize: 24,
    borderRadius: 4,
    textDecoration: props.currentIndex === props.index ? "underline" : "none",
    color: props.currentIndex === props.index ? theme.white : "black"
  }),
  word: {
    margin: "0 1.5px",
    padding: "0 5px 0 5px",
    fontSize: 24,
    userSelect: "none"
  },
  hidden: {
    extend: "word",
    color: "transparent",
    backgroundColor: theme.grey,
    borderRadius: "4px",
    margin: "3px 0px 3px 16px",
    padding: 0,
    minWidth: "20px",
    boxShadow: "0px 2px 2px rgba(50,50,93,.25)"
    // padding: "0 5px"
  },
  complete: {
    extend: "hidden",
    backgroundColor: "#06a978"
  },
  letter: {
    padding: "1px 0",
    "&:first-child": {
      padding: "1px 0 1px 5px",
      borderRadius: "4px 0 0 4px"
    },
    "&:last-child": {
      padding: "1px 5px 1px 0",
      borderRadius: "0 4px 4px 0"
    },
    "&:only-child": {
      padding: "1px 5px 1px 5px",
      borderRadius: 4
    }
  }
});

Word.propTypes = propTypes;

export default withStyles(styles)(Word);
