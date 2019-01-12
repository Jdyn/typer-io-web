import React from "react";
import injectSheet from "react-jss";
import InputPrompt from "./InputPrompt";
import InputRecord from "./InputRecord";

const Editor = props => {
  const { classes, gameboard, gameboardUpdate, client, room } = props;
  const focusInput = () => {
    document.getElementById("inputDiv").focus();
  };

  // inputDidUpdate = e => {
  //   const { wordsRemaining, wordsComplete, key, words, errors } = this.state;
  //   const input = e.target.innerText;
  //   const currentWord = words[wordsComplete.length];
  //   this.setState({ input });

  //   if (input === currentWord.substring(0, input.length)) {
  //     this.setState({ isWrong: false });

  //     if (input !== currentWord) {
  //       let copy = [...wordsRemaining];
  //       copy[0] = currentWord.substring(input.length, currentWord.length);
  //       this.setState({
  //         wordsRemaining: copy
  //       });
  //     } else if (input === currentWord) {
  //       let copy = wordsRemaining.slice();
  //       copy[0] = "";
  //       this.setState({
  //         wordsRemaining: copy
  //       });
  //     }
  //   } else {
  //     if (key !== " " && key !== "Backspace" && key !== "Enter") {
  //       this.setState({ isWrong: true, errors: this.state.errors + 1 });
  //     } else {
  //       this.setState({ isWrong: true });
  //     }
  //   }

  //   if (key === " ") {
  //     if (currentWord === input.trim()) {
  //       e.target.innerText = "";
  //       let newWordsRemaining = [...wordsRemaining];

  //       newWordsRemaining.shift();
  //       const entries = words[wordsComplete.length].length || 0;

  //       // this.props.gameboardUpdate(wordsComplete.length);

  //       const payload = {
  //         entries: entries + 1,
  //         currentIndex: wordsComplete.length,
  //         errors: errors
  //       };

  //       // this.props.socket.io.emit("clientUpdate:game", payload);

  //       this.setState(prevState => ({
  //         wordsRemaining: newWordsRemaining,
  //         wordsComplete: [...prevState.wordsComplete, currentWord],
  //         entries: prevState.entries + words[wordsComplete.length].length,
  //         isWrong: false
  //       }));

  //       if (newWordsRemaining.length <= 0) {
  //         document.getElementById("inputDiv").contentEditable = false;
  //       }
  //     }
  //   }
  // };

  return (
    <div className={classes.container}>
      {client.id &&
        <div className={classes.wrapper} onClick={focusInput}>
          <InputRecord
            gameboard={gameboard}
            gameboardUpdate={gameboardUpdate}
          />
        </div>
      }
      {client.id &&
        <div className={classes.wrapper} onClick={focusInput}>
          <InputPrompt
            gameboard={gameboard}
          />
        </div>
      }
    </div>
  );
}

const styles = theme => ({
  container: {
    margin: "15px 15px 15px 15px",
    display: "flex",
    position: "relative",
    overflow: " hidden",
    maxWidth: "650px",
    minWidth: "450px",
    height: "100px",
    gridColumn: "2 / 3",
    flexDirection: "row",
    backgroundColor: theme.primaryWhite,
    borderRadius: 8,
    transition: "background-color 0.5s",
    boxShadow: "0px -6px 40px 0px rgba(50,50,93,.25) inset"
  },
  wrapper: {
    display: "inline-block",
    width: "50%",
    height: "100%",
    overflow: "hidden"
  }
});

export default injectSheet(styles)(Editor);
