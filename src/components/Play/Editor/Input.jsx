import React, { useEffect, useState } from "react";
import withStyles from "react-jss";
import { silentEmit } from "../../../store/socket";

const Input = props => {
  const { classes, words, wordsComplete, wordsRemaining, editorUpdate, gameboard } = props;
  const [key, setKey] = useState("")
  const [state, setState] = useState({
    key: "",
    input: "",
    entries: 0,
    errors: 0,
  })

  /**
   * Listener is being added and removed every state update.
   * Need to find a fix.
   */
  useEffect(() => {
    const editor = document.getElementById("inputDiv");
    editor.addEventListener("keydown", keydown, true)
    return (() => {
      editor.removeEventListener("keydown", keydown, true)
    })
  }, [gameboard, state])

  const keydown = event => {
    setKey(event.key);
    if (!gameboard.isStarted) {
      event.preventDefault();
    }
    if (event.key === " ") {
      if (state.input !== words[wordsComplete.length]) {
        event.preventDefault();
      }
    } else if (event.key === "Enter") {
      event.preventDefault();
    }
  }

  const inputDidUpdate = event => {
    const { errors, entries } = state;
    const input = event.target.innerText;
    const currentWord = words[wordsComplete.length];
    setState({ ...state, input: input });
    if (input === currentWord.substring(0, input.length)) {
      if (input !== currentWord) {
        let copy = [...wordsRemaining];
        copy[0] = currentWord.substring(input.length, currentWord.length);
        editorUpdate({ wordsRemaining: copy, isWrong: false })
      } else if (input === currentWord) {
        let copy = wordsRemaining.slice();
        copy[0] = "";
        editorUpdate({ wordsRemaining: copy, isWrong: false })
      }
    } else {
      if (key !== " " && key !== "Backspace" && key !== "Enter") {
        setState({ ...state, errors: errors + 1 });
        editorUpdate({ isWrong: true })
      } else {
        editorUpdate({ isWrong: true })
      }
    }

    if (key === " ") {
      if (currentWord === input.trim()) {
        event.target.innerText = "";
        let newWordsRemaining = [...wordsRemaining];

        newWordsRemaining.shift();
        const newEntry = words[wordsComplete.length].length + 1;
        const newIndex = wordsComplete.length
        const payload = {
          entries: newEntry,
          currentIndex: newIndex,
          errors: errors
        };

        silentEmit("CLIENT_UPDATE", payload);
        setState({ ...state, entries: entries + newEntry, isWrong: false })
        editorUpdate({
          gamePieceIndex: newIndex,
          wordsRemaining: newWordsRemaining,
          wordsComplete: [...wordsComplete, currentWord],
        })

        if (newWordsRemaining.length <= 0) {
          document.getElementById("inputDiv").contentEditable = false;
        }
      }
    }
  }

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
    whiteSpace: 'nowrap',
    outline: "none",
    color: props => props.isWrong ? '#da552f' : '#24b47e',
    textShadow: '0px 0px .5px rgba(50,50,93,.25)',
    caretColor: '#0d2b3e',
    fontSize: "28px",
    fontWeight: "400",
    paddingLeft: "5px",
    verticalAlign: "middle",
  }
};

export default withStyles(styles)(Input);
