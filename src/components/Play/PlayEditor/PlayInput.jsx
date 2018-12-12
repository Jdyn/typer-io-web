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
      wordsRemaining: this.props.snippetArray,
      words: this.props.snippetArray
    };
  }

  componentWillMount() {
    this.establishInputListener();
  }

  focusInput = () => {
    document.getElementById("inputDiv").focus();
  };

  inputDidUpdate = text => {
    const { wordsRemaining, words, key } = this.state;
    const currentWord = wordsRemaining[0];

    console.log(key, text);

    // if (key === " ") {
    //   var copy = wordsRemaining.slice()
    //   console.log(copy.shift())
    //   this.setState({
    //     wordsRemaining: temp
    //   });
    // }

    if (currentWord.charAt(0) === key) {
      var temp = currentWord.split("");
      if (currentWord.charAt(0) === temp[0]) {
        temp.shift();
        var copy = wordsRemaining.slice();
        copy[0] = temp.join("");
        this.setState({
          wordsRemaining: copy
        });
      }
    }

    // if (
    //   wordsRemaining[0].charAt(0) === keyPressed &&
    //   inputText === words[0].substring(0, inputText.length)
    // ) {

    // }

    // if (key.length !== 1) {
    //   if (key === "Backspace") {
    //     var newText = this.state.text.split("");
    //     newText.pop();
    //     this.setState({ keyPressed: key, text: newText.join("") });
    //   }
    //   return;
    // } else {
    //   const isLetter = key >= "a" && key <= "z";
    //   if (isLetter) {
    //     this.setState({
    //       keyPressed: key,
    //       text: this.state.text + key
    //     });
    //   }
    // }
  };

  establishInputListener = () => {
    window.addEventListener("load", () => {
      const editor = document.getElementById("inputDiv");
      editor.addEventListener("keydown", e => {
        const key = e.key;
        this.setState({ key });
      });
    });
  };

  render() {
    const { classes } = this.props;
    const { wordsRemaining } = this.state
    return (
      <div className={classes.container}>
        <div className={classes.wrapper} onClick={this.focusInput}>
          <PlayInputContent inputDidUpdate={this.inputDidUpdate} />
        </div>
        <div className={classes.wrapper} onClick={this.focusInput}>
          <PlayInputPrompt wordsRemaining={this.state.wordsRemaining} />
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
