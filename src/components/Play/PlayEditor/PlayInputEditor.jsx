import React from "react";
import injectSheet from "react-jss";

class PlayInputEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, inputDidUpdate } = this.props;
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
        onInput={e => inputDidUpdate(e.target.innerText)}
      />
    );
  }
}

const styles = {
  input: {
    display: "flex",
    lineHeight: "40px",
    outline: 0,
    fontSize: "28px",
    paddingLeft: "5px",
    verticalAlign: "middle"
  }
};

export default injectSheet(styles)(PlayInputEditor);
