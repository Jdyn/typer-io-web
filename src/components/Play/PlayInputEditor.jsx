import React from "react";
import injectSheet from "react-jss";

const PlayInputEditor = ({ classes }) => {
  return (
    <div
      className={classes.input}
      tabIndex="1"
      contentEditable="true"
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
    />
  );
};

const styles = {
  input: {
    display: 'flex',
    lineHeight: '40px',
    width: '15px',
    outline: 0,
    paddingLeft: '5px',
    verticalAlign: 'middle',
  }
};

export default injectSheet(styles)(PlayInputEditor);
