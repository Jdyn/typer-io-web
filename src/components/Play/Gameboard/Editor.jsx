import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const Editor = props => {
  const {
    classes,
    currentWord,
    gameboard,
    input,
    inputDidUpdate,
    submitWord,
    setEditorState,
    gameState
  } = props;

  console.log(props.isWrong);

  const keydown = event => {
    if (!gameboard.isStarted) {
      event.preventDefault();
    }

    if (event.key !== "Backspace") {
      if (
        gameState.currentInput !==
        gameState.currentWord.substring(0, gameState.currentInput.length)
      ) {
        setEditorState(prev => ({ ...prev, errors: prev.errors + 1 }));
      }
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
      <div className={classes.inner}>
        <input
          id="input"
          className={classes.input}
          tabIndex="0"
          autoComplete="off"
          autoCorrect="off"
          maxLength={`${currentWord ? currentWord.length + 3 : 524288}`}
          autoCapitalize="off"
          spellCheck="false"
          value={input}
          onChange={e => inputDidUpdate(e)}
          onKeyDown={e => keydown(e)}
        />
      </div>

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
    height: "135px",
    gridArea: "editor",
    margin: "0 15px",
    padding: "24px 24px 24px 24px",
    flexDirection: "column",
    backgroundColor: theme.white,
    borderRadius: 16,
    transition: "background-color 0.5s",
    boxShadow: "0px 10px 15px rgba(30,30,70,.3)"
  }),
  inner: props => ({
    display: "flex",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid #e5e5e5",
    width: "100%",
    height: "100%",
    borderRadius: 16,
    "&:before": {
      content: "''",
      transitionDuration: "0.1s",
      position: "absolute",
      top: -2,
      left: -2,
      zIndex: 0,
      borderRadius: 16,
      // border: "2px solid #e5e5e5",
      backgroundColor: props.isWrong ? "#f4433666" : "transparent",
      width: "calc(100% + 4px)",
      height: "calc(100% + 4px)"
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
