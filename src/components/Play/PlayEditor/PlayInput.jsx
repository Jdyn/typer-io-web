import React from "react";
import injectSheet from "react-jss";
import PlayInputPrompt from "./PlayInputPrompt";
import PlayInputContent from "./PlayInputContent";

class PlayInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: ""
    }
  }

  componentWillMount() {
    // this.establishInputListener();
    this.snippetWordsRemaining = this.props.snippetArray
  }
  focusInput = () => {
    document.getElementById("inputDiv").focus();
  };
  inputDidUpdate = (input) => {
    this.setState({input})
  };

  establishInputListener = () => {
    window.addEventListener("load", () => {
      const editor = document.getElementById("inputDiv");
      editor.addEventListener("keyup", e => {
        this.inputDidUpdate(e.key, editor.innerText);
      });
    });
  };

  render() {
    const { classes, snippetArray } = this.props;
    return (
      <div className={classes.container}>
        <div className={classes.wrapper} onClick={this.focusInput}>
          <PlayInputContent
            snippetArray={snippetArray}
            inputDidUpdate={this.inputDidUpdate}
          />
        </div>
        <div className={classes.wrapper} onClick={this.focusInput}>
          <PlayInputPrompt snippetArray={this.snippetWordsRemaining} input={this.state.input}/>
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
