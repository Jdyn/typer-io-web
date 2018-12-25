import React from "react";
import injectSheet from "react-jss";

const Input = props => {
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
    whiteSpace: 'nowrap',
    color: props => props.isWrong ? '#da552f' : '#24b47e', 
    textShadow: '0px 0px .5px rgba(50,50,93,.25)',
    caretColor: '#0d2b3e',
    fontSize: "28px",
    fontWeight: "400",
    paddingLeft: "5px",
    verticalAlign: "middle",
    textDecoration: props => props.isWrong ? "line-through" : "none"
  }
};

export default injectSheet(styles)(Input);
