import React from "react";
import injectSheet from "react-jss";
import PlayInputPrompt from "./PlayInputPrompt";
import PlayInputContent from "./PlayInputContent";

class PlayInput extends React.Component {
  constructor(props) {
    super(props);
    this.input = "";
    this.state = {
      key: "k",
      text: "",
      oldText: "",
      wordsRemaining: this.props.snippetArray,
      words: this.props.snippetArray,
      wordsComplete: []
    };
  }

  componentWillMount() {
    this.establishInputListener();
  }

  focusInput = () => {
    document.getElementById("inputDiv").focus();
  };

  inputDidUpdate = e => {
    const { wordsRemaining, wordsComplete, words, key, oldText } = this.state;
    const currentWord = wordsRemaining[0];
    var text = e.target.innerText;

    if (text.substring(0, text.length) === words[0].substring(0, text.length)) {



      // console.log(oldText);
      // console.log(text);
      // console.log(text.substring(0, text.length), words[0].substring(0, text.length) )

      if (text === words[0].substring(0, text.length)) {
        if (text !== words[0]) {
          let copy = wordsRemaining.slice();
          copy[0] = words[0].substring(text.length, words[0].length);
          this.setState({
            wordsRemaining: copy
          });
        } else if (text === words[0]) {
          let copy = wordsRemaining.slice();
          copy[0] = "";
          this.setState({
            wordsRemaining: copy
          });
        }
      }
      if (e.target.innerText === "") {
        if (wordsRemaining[0] !== words[0]) {
          let copy = wordsRemaining.slice();
          copy[0] = words[0];
          this.setState({
            wordsRemaining: copy
          });
        }
      }

      if (key === "Backspace") {

        if (
          oldText.charAt(oldText.length - 1) ===
          words[0].charAt(oldText.length - 1)
        ) {
          console.log('still true')
          let copy = wordsRemaining.slice();
          // let temp = copy[0].substring()
          copy[0] = words[0].substring(text.length, words[0].length);

          // let target = words[0].charAt(oldText.length - 1);
          // temp.unshift(target);
          // var string = temp.join("");
          // copy[0] = string;
          this.setState({
            wordsRemaining: copy
          });
        } else {
          console.log("else happened");
        }
      }

      if (currentWord.charAt(0) === key) {
        let temp = currentWord.split("");
        if (currentWord.charAt(0) === words[0].charAt(text.length - 1)) {
          temp.shift();
          let copy = wordsRemaining.slice();
          copy[0] = temp.join("");
          this.setState({
            wordsRemaining: copy
          });
        }
      }
    }

    if (key === " ") {
      if (words[0] === text.trim()) {
        var wordCopy = words.slice();
        wordCopy.shift();
        var completeWordCopy = wordsComplete.slice();
        completeWordCopy.push(words[0]);
        this.setState({
          wordsRemaining: wordCopy,
          words: wordCopy,
          wordsComplete: completeWordCopy
        });
        e.target.innerText = "";
      }
    }
  };

  establishInputListener = () => {
    window.addEventListener("load", () => {
      const editor = document.getElementById("inputDiv");
      editor.addEventListener("keydown", e => {
        const key = e.key;
        this.setState({
          key: key,
          oldText: editor.innerText
        });
      });
    });
  };

  render() {
    const { classes } = this.props;
    const { wordsRemaining, wordsComplete } = this.state;
    return (
      <div className={classes.container}>
        <div className={classes.wrapper} onClick={this.focusInput}>
          <PlayInputContent
            wordsComplete={wordsComplete}
            inputDidUpdate={this.inputDidUpdate}
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
    flexDirection: "row",
    margin: "15px 15px 0px 15px",
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
