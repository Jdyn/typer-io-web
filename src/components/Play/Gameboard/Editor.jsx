import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const Editor = props => {
  const { classes, currentWord, gameboard, input, inputDidUpdate, submitWord, isWrong } = props;

  const [focused, setFocus] = useState(false);

  const keydown = event => {
    if (!gameboard.isStarted) {
      event.preventDefault();
    }

    if (event.key === " ") {
      if (input !== currentWord) {
        event.preventDefault();
      } else if (input.trim() === currentWord) {
        event.preventDefault();
        submitWord();
        document.getElementById("input").innerText = "";
      }
    } else if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const focusInput = () => {
    const editor = document.getElementById("input");
    if (editor) {
      editor.focus();
    }
  };

  return (
    <div className={classes.container} onClick={() => focusInput()}>
      <input
        id="input"
        className={classes.input}
        tabIndex="0"
        autoComplete="off"
        autoCorrect="off"
        maxLength={`${currentWord ? currentWord.length : 524288}`}
        autoCapitalize="off"
        spellCheck="false"
        value={input}
        onChange={e => inputDidUpdate(e)}
        onKeyDown={e => keydown(e)}
      />
      {/* {document.activeElement.id !== "input" ? (
        gameboard.isStarted ? null : (
          <div>{gameboard.isStarted ? "" : "click here to type"}</div>
        )
      ) : null} */}
    </div>
  );
};

Editor.propTypes = propTypes;

const styles = theme => ({
  container: props => ({
    display: "flex",
    position: "relative",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    height: "115px",
    border: "2px solid #e5e5e5",
    // boxShadow: "0px 0px 5px rgba(30,30,70,.3) inset",
    flexDirection: "column",
    backgroundColor: theme.white,
    borderRadius: 16,
    transition: "background-color 0.5s",
    "&:after": {
      content: "''",
      transitionDuration: "0.1s",
      position: "absolute",
      backgroundColor: props.isWrong ? "rgb(244,67,54, 0.4)" : "transparent",
      width: "100%",
      height: "100%"
    }
  }),
  input: {
    display: "inline-block",
    lineHeight: "40px",
    whiteSpace: "nowrap",
    border: "none",
    textAlign: "center",
    outline: "none",
    color: "black",
    textShadow: "0px 0px .5px rgba(50,50,93,.25)",
    caretColor: "#0d2b3e",
    fontSize: "30px",
    fontWeight: "400",
    padding: 0
  }
});

export default withStyles(styles)(Editor);
