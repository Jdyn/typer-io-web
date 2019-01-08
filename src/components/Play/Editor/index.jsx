import React from "react";
import injectSheet from "react-jss";
import InputPrompt from "./InputPrompt";
import InputRecord from "./InputRecord";

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      isWrong: false,
      entries: 0,
      errors: 0,
      words: [],
      wordsRemaining: [],
      wordsComplete: []
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.state.words.length === 0) {
        this.setState({
          wordsRemaining: this.props.snippetArray,
          words: this.props.snippetArray
        });
      }
    }
  }

  componentDidMount() {
    const editor = document.getElementById("inputDiv");
    editor.addEventListener("keydown", e => {
      this.setState({ key: e.key });
      if (!this.props.isStarted) {
        e.preventDefault();
      }
      if (e.key === " ") {
        if (this.state.input !== this.state.words[this.state.wordsComplete.length]) {
          e.preventDefault();
        }
      } else if (e.key === "Enter") {
        e.preventDefault();
      }
    });
  }

  focusInput = () => {
    document.getElementById("inputDiv").focus();
  };

  inputDidUpdate = e => {
    const { wordsRemaining, wordsComplete, key, words, errors } = this.state;
    const input = e.target.innerText;
    const currentWord = words[wordsComplete.length];
    this.setState({ input });

    if (input === currentWord.substring(0, input.length)) {
      this.setState({ isWrong: false });

      if (input !== currentWord) {
        let copy = [...wordsRemaining];
        copy[0] = currentWord.substring(input.length, currentWord.length);
        this.setState({
          wordsRemaining: copy
        });
      } else if (input === currentWord) {
        let copy = wordsRemaining.slice();
        copy[0] = "";
        this.setState({
          wordsRemaining: copy
        });
      }
    } else {
      if (key !== " " && key !== "Backspace" && key !== "Enter") {
        this.setState({ isWrong: true, errors: this.state.errors + 1 });
      } else {
        this.setState({ isWrong: true });
      }
    }

    if (key === " ") {
      if (currentWord === input.trim()) {
        e.target.innerText = "";
        let newWordsRemaining = [...wordsRemaining];

        newWordsRemaining.shift();
        const entries = words[wordsComplete.length].length
          ? words[wordsComplete.length].length
          : 0;

        this.props.updateGameboard(wordsComplete.length);

        const payload = {
          entries: entries + 1,
          currentIndex: wordsComplete.length,
          errors: errors
        };

        this.props.socket.io.emit("clientUpdate:game", payload);

        this.setState(prevState => ({
          wordsRemaining: newWordsRemaining,
          wordsComplete: [...prevState.wordsComplete, currentWord],
          entries: prevState.entries + words[wordsComplete.length].length,
          isWrong: false
        }));

        if (newWordsRemaining.length <= 0) {
          document.getElementById("inputDiv").contentEditable = false;
        }
      }
    }
  };

  render() {
    const { classes, isStarted } = this.props;
    const { wordsRemaining, wordsComplete, isWrong } = this.state;
    return (
      <div className={classes.container}>
        <div className={classes.inner}>
          <div className={classes.wrapper} onClick={this.focusInput}>
            <InputRecord
              wordsComplete={wordsComplete}
              inputDidUpdate={this.inputDidUpdate}
              isWrong={isWrong}
            />
          </div>
          <div className={classes.wrapper} onClick={this.focusInput}>
            <InputPrompt wordsRemaining={wordsRemaining} isStarted={isStarted} />
          </div>
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  inner: {
    display: "flex",
    position: "relative",
    overflow: " hidden",
    width: "100%",
    gridColumn: "2 / 3",
    flexDirection: "row",
    backgroundColor: props =>
      props.isStarted ? theme.primaryWhite : theme.transparentGrey,
    borderRadius: 8,
    transition: "background-color 0.5s",
    boxShadow: "0px -6px 40px 0px rgba(50,50,93,.25) inset"
  },
  container: {
    margin: "15px 15px 15px 15px",
    display: "flex",
    // width: "600px",
    position: "relative",
    backgroundColor: theme.primaryWhite
  },
  wrapper: {
    display: "inline-block",
    width: "50%",
    height: "95px",
    overflow: "hidden"
  }
});

export default injectSheet(styles)(Editor);
