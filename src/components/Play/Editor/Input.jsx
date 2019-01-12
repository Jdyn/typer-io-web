import React, { useEffect, useState } from "react";
import injectSheet from "react-jss";

const Input = props => {
  const { classes, gameboard, gameboardUpdate } = props;
  const [state, setState] = useState({
    key: "",
    input: "",
    isWrong: false,
    entries: 0,
    errors: 0,
  })
  const [key, setKey] = useState("")

  useEffect(() => {
    const editor = document.getElementById("inputDiv");
    editor.addEventListener("keydown", keydown, true)

    return (() => {
      editor.removeEventListener("keydown", keydown, true)
    })
  }, [])

  const keydown = event => {
    setKey(event.key);
    // setState({...state, key: event.key})
    // const { input } = state
    const { words, wordsComplete } = gameboard
    if (event.key === " ") {
      // console.log(input, words[wordsComplete.length])
      // if (input !== words[wordsComplete.length]) {
      //   event.preventDefault();
      // }
    } else if (event.key === "Enter") {
      event.preventDefault();
    }
  }

  const inputDidUpdate = event => {
    const { errors, entries } = state;
    const { words, wordsComplete, wordsRemaining } = props.gameboard
    const input = event.target.innerText;
    const currentWord = words[wordsComplete.length];
    setState({ ...state, input: input });
    console.log(state)
    if (input === currentWord.substring(0, input.length)) {
      setState({ ...state, isWrong: false });

      if (input !== currentWord) {
        let copy = [...wordsRemaining];
        copy[0] = currentWord.substring(input.length, currentWord.length);
        gameboardUpdate({ wordsRemaining: copy })
      } else if (input === currentWord) {
        let copy = wordsRemaining.slice();
        copy[0] = "";
        gameboardUpdate({ wordsRemaining: copy })
      }
    } else {
      if (key !== " " && key !== "Backspace" && key !== "Enter") {
        setState({ ...state, isWrong: true, errors: state.errors + 1 });
      } else {
        setState({ ...state, isWrong: true });
      }
    }

    if (key === " ") {
      if (currentWord === input.trim()) {
        event.target.innerText = "";
        let newWordsRemaining = [...wordsRemaining];

        newWordsRemaining.shift();
        const entries = words[wordsComplete.length].length;

        // this.props.gameboardUpdate(wordsComplete.length);

        const payload = {
          entries: entries + 1,
          currentIndex: wordsComplete.length,
          errors: errors
        };

        // this.props.socket.io.emit("clientUpdate:game", payload);
        setState({ ...state, entries: state.entries + words[wordsComplete.length].length, isWrong: false })
        gameboardUpdate({
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

export default injectSheet(styles)(Input);
