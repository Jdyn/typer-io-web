import React from "react";
import injectSheet from "react-jss";
import PlayInputPrompt from "./PlayInputPrompt";
import PlayInputContent from "./PlayInputContent";

class PlayInput extends React.Component {
  constructor(props) {
    super(props);
    this.snippet = this.props.snippet;
  }

  componentWillMount() {
    var input = "";
    var correctWords = [];
    var remainingWords = [];
    var currentWord = {
      cords: [],
      word: ""
    };
  }

  focusInput = () => {
    document.getElementById("inputDiv").focus();
  };

  inputDidUpdate = event => {};

  establishInputListener = () => {
    window.addEventListener("load", () => {
      const editor = document.getElementById("inputDiv");
      editor.addEventListener("keydown", e => {
        console.log(e.key);
      });
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <div className={classes.wrapper} onClick={this.focusInput}>
          <PlayInputContent />
        </div>
        <div className={classes.wrapper} onClick={this.focusInput}>
          <PlayInputPrompt />
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
    // "&:after": {
    //   content: '""',
    //   boxShadow: "0 0 35px 45px #fafafa",
    //   position: "relative",
    //   top: 40,
    //   bottom: 40
    // }
  },
  wrapper: {
    display: "inline-block",
    width: "50%",
    height: "95px",
    overflow: "hidden"
  }
});

export default injectSheet(styles)(PlayInput);
