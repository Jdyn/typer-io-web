import React from "react";
import injectSheet from "react-jss";
import PlayInputPrompt from "./PlayInputPrompt";
import PlayInputContent from "./PlayInputContent";

class PlayInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      prevText: "",
      inputIsWrong: false,
      currentWord: "",
      text: "",
      wordsRemaining: [],
      wordsComplete: []
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({
        wordsRemaining: this.props.snippetArray,
        currentWord: this.props.snippetArray[0]
      });
    }
  }

  componentDidMount() {
    const editor = document.getElementById("inputDiv");
    editor.addEventListener("keypress", e => {
      console.log(e.key)
      if (e.key === " " || e.key === "Enter") {
        if (this.state.text !== this.state.currentWord) {
          e.preventDefault();
        }
      }
      this.setState({
        key: e.key,
        prevText: editor.innerText
      });
    });
  }

  focusInput = () => {
    document.getElementById("inputDiv").focus();
  };

  inputDidUpdate = e => {
    const text = e.target.innerText;
    const {
      wordsRemaining,
      wordsComplete,
      key,
      prevText,
      currentWord
    } = this.state;

    if (wordsRemaining.length > 0) {
      if (
        text.substring(0, text.length) === currentWord.substring(0, text.length)
      ) {
        this.setState({
          inputIsWrong: false,
          text: text
        });

        if (text === currentWord.substring(0, text.length)) {
          if (text !== currentWord) {
            let copy = wordsRemaining.slice();
            copy[0] = currentWord.substring(text.length, currentWord.length);
            this.setState({
              wordsRemaining: copy
            });
          } else if (text === currentWord) {
            let copy = wordsRemaining.slice();
            copy[0] = "";
            this.setState({
              wordsRemaining: copy
            });
          }
        }

        if (e.target.innerText === "") {
          if (wordsRemaining[0] !== currentWord) {
            let copy = wordsRemaining.slice();
            copy[0] = currentWord;
            this.setState({
              wordsRemaining: copy
            });
          }
        }

        if (key === "Backspace") {
          if (
            prevText.charAt(prevText.length - 1) ===
            currentWord.charAt(prevText.length - 1)
          ) {
            let copy = wordsRemaining.slice();
            copy[0] = currentWord.substring(text.length, currentWord.length);
            this.setState({
              wordsRemaining: copy
            });
          }
        }

        if (currentWord.charAt(0) === key) {
          let temp = currentWord.split("");
          if (
            currentWord.charAt(0) === currentWord.charAt(prevText.length - 1)
          ) {
            temp.shift();
            let copy = wordsRemaining.slice();
            copy[0] = temp.join("");
            this.setState({
              wordsRemaining: copy
            });
          }
        }
      } else {
        if (text.trim() !== "") {
          this.setState({
            inputIsWrong: true
          });
        }
      }

      if (key === " ") {
        if (currentWord === text.trim()) {
          e.target.innerText = "";
          let wordsCopy = [...wordsRemaining];
          let wordsCompleteCopy = [...wordsComplete];
          wordsCopy.shift();
          wordsCompleteCopy.push(currentWord);

          this.setState({
            wordsRemaining: wordsCopy,
            currentWord: wordsCopy[0],
            wordsComplete: wordsCompleteCopy,
            inputIsWrong: false
          });

          if (wordsCopy.length <= 0) {
            document.getElementById("inputDiv").contentEditable = false;
          }
        }
      }
    }
  };

  render() {
    const { classes } = this.props;
    const { wordsRemaining, wordsComplete, inputIsWrong } = this.state;
    return (
      <div className={classes.container}>
        <div className={classes.wrapper} onClick={this.focusInput}>
          <PlayInputContent
            wordsComplete={wordsComplete}
            inputDidUpdate={this.inputDidUpdate}
            inputIsWrong={inputIsWrong}
          />
        </div>
        <div className={classes.wrapper} onClick={this.focusInput}>
          <PlayInputPrompt wordsRemaining={wordsRemaining} />
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

export default injectSheet(styles)(PlayInput);
