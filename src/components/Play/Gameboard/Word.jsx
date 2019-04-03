import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const Word = props => {
  const { classes, word, index, currentIndex, currentWord, input, wrongIndex, setWrongIndex } = props;

  const [splitWord] = useState(word.split(""));

  const validateLetter = index => {
    const text = input.split("");
    if (text[index]) {
      if (text[index] === splitWord[index]) {
        if (wrongIndex !== null) {
          if (wrongIndex < index) {
            return "#f44336";
          }
        }
        return "#4CAF50";
      } else {
        if (index < wrongIndex || wrongIndex === null) {
          setWrongIndex(index);
        }
        return "#f44336";
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
  ) : (
    <span className={classes.word}>{word}</span>
  );
};

const styles = theme => ({
  currentWord: props => ({
    margin: "1px 1.5px",
    padding: 0,
    fontSize: 22,
    fontFamily: ["Segoe UI"],
    borderRadius: 4,
    textDecoration: props.currentIndex === props.index ? "underline" : "none",
    color: props.currentIndex === props.index ? theme.white : "black"
  }),
  word: {
    margin: "1px 1.5px",
    padding: "0 5px 0 5px",
    fontFamily: ["Segoe UI"],
    fontSize: 22,
    borderRadius: 4,
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
    paddingTop: "1px",
    paddingBottom: "1px",
    "&:first-child": {
      paddingLeft: "5px",
      borderRadius: "4px 0 0 4px"
    },
    "&:last-child": {
      paddingRight: "5px",
      borderRadius: "0 4px 4px 0"
    },
    "&:only-child": {
      padding: "0 5px",
      borderRadius: 4
    }
  }
});

Word.propTypes = propTypes;

export default withStyles(styles)(Word);
