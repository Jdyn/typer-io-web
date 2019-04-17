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
  setEditorState: PropTypes.func.isRequired
};

const Word = props => {
  const { classes, word, index, currentIndex, input, wrongIndex, setEditorState } = props;

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
          setEditorState(prev => ({ ...prev, wrongIndex: index }));
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
    margin: 0, //"1px 1.5px",
    padding: "2px 6.5px 2px 6.5px",
    fontFamily: ["Segoe UI"],
    fontSize: 22,
    zIndex: 10,
    borderRadius: 4,
    lineHeight: "25px",
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
    paddingTop: "2px",
    paddingBottom: "2px",
    transitionDuration: "0.02s",
    transition: "background-color ease-out",
    "&:first-child": {
      paddingLeft: "6.5px",
      borderRadius: "4px 0 0 4px"
    },
    "&:last-child": {
      paddingRight: "6.5px",
      borderRadius: "0 4px 4px 0"
    },
    "&:only-child": {
      padding: "0 6.5px",
      borderRadius: 4
    }
  }
});

Word.propTypes = propTypes;

export default withStyles(styles)(Word);
