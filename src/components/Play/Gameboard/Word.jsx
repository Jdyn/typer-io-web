import React, { useState } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";

const propTypes = {
  classes: PropTypes.object.isRequired,
  word: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  currentIndex: PropTypes.number,
  input: PropTypes.array.isRequired,
  wrongIndex: PropTypes.number,
  setWrongIndex: PropTypes.func.isRequired
};

const Word = props => {
  const { classes, word, index, currentIndex, input, wrongIndex, setWrongIndex } = props;

  const [wordArray] = useState(word.split(""));

  const validateLetter = index => {
    if (input[index]) {
      if (input[index] === wordArray[index]) {
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
    <div className={classes.current}>
      {wordArray.map((letter, index) => (
        <span
          key={index}
          className={classes.letter}
          style={{ backgroundColor: validateLetter(index) }}
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
  word: {
    margin: "1px 1.5px",
    padding: "0 5px 0 5px",
    fontFamily: ["Segoe UI"],
    fontSize: 22,
    zIndex: 10,
    borderRadius: 4,
    userSelect: "none"
  },
  current: props => ({
    extend: "word",
    padding: 0,
    zIndex: 10,
    textDecoration: props.currentIndex === props.index ? "underline" : "none",
    color: props.currentIndex === props.index ? theme.white : "black"
  }),
  letter: {
    paddingTop: "1px",
    paddingBottom: "1px",
    transitionDuration: "0.02s",
    transition: "background-color ease-out",
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
