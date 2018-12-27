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
    editor.addEventListener("keypress", e => {
      this.setState({ key: e.key });

      if (e.key === " " || e.key === "Enter") {
        if (this.state.input !== this.state.words[this.state.wordsComplete.length]) {
          e.preventDefault();
        }
      }
    });
  }

  focusInput = () => {
    document.getElementById("inputDiv").focus();
  };

  inputDidUpdate = e => {
    const { wordsRemaining, wordsComplete, key, words, entries } = this.state;
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
      this.setState({ isWrong: true });
    }

    if (key === " ") {
      if (currentWord === input.trim()) {
        e.target.innerText = "";
        let newWordsRemaining = [...wordsRemaining];

        newWordsRemaining.shift();

        
        const entries = words[wordsComplete.length].length
          ? words[wordsComplete.length].length
          : 0;

        this.props.socket.io.emit("clientUpdate:game", entries);

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
    const { classes } = this.props;
    const { wordsRemaining, wordsComplete, isWrong } = this.state;
    return (
      <div className={classes.container}>
        <div className={classes.wrapper} onClick={this.focusInput}>
          <InputRecord
            wordsComplete={wordsComplete}
            inputDidUpdate={this.inputDidUpdate}
            isWrong={isWrong}
          />
        </div>
        <div className={classes.wrapper} onClick={this.focusInput}>
          <InputPrompt wordsRemaining={wordsRemaining} />
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    display: "flex",
    position: "relative",
    overflow: " hidden",
    gridColumn: "2 / 3",
    flexDirection: "row",
    margin: "15px 15px 15px 15px",
    backgroundColor: theme.primaryWhite,
    borderRadius: 8,
    boxShadow: "0px -6px 40px 0px rgba(50,50,93,.25) inset"
  },
  wrapper: {
    display: "inline-block",
    width: "50%",
    height: "95px",
    overflow: "hidden"
  }
});

export default injectSheet(styles)(Editor);
