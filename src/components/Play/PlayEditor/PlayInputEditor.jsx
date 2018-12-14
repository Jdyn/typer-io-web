import React from "react";
import injectSheet from "react-jss";

const PlayInputEditor = props => {
  const { classes, inputDidUpdate } = props;

  return (
    <div
      id="inputDiv"
      className={classes.input}
      tabIndex="1"
      contentEditable="true"
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
      onInput={e => inputDidUpdate(e)}
    />
  );
};

const styles = {
  input: {
    display: "inline-block",
    lineHeight: "40px",
    outline: 0,
    color: props => props.inputIsWrong ? '#FF5A5F' : '#24b47e',
    caretColor: '#0d2b3e',
    fontSize: "28px",
    fontWeight: "500",
    paddingLeft: "5px",
    verticalAlign: "middle",
    textDecoration: props => props.inputIsWrong ? "line-through" : "none"
  }
};

export default injectSheet(styles)(PlayInputEditor);
