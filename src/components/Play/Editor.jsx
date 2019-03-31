import React, { useEffect } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";

const propTypes = {
  classes: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired
};

const Editor = props => {
  const { classes, client, inputDidUpdate } = props;
  useEffect(() => {
    focusInput();
  }, [client.id]);

  const focusInput = () => {
    const input = document.getElementById("inputDiv");
    if (input) {
      input.focus();
    }
  };

  return (
    <div className={classes.container} onClick={focusInput}>
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
    </div>
  );
};

Editor.propTypes = propTypes;

const styles = theme => ({
  container: {
    margin: "0 30px 30px 30px",
    display: "flex",
    position: "relative",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "650px",
    minWidth: "450px",
    height: "120px",
    gridArea: "editor",
    flexDirection: "row",
    backgroundColor: theme.white,
    borderRadius: 8,
    transition: "background-color 0.5s",
    boxShadow: "0px -5px 25px -2px rgba(50,50,93,.3) inset"
  },
  input: {
    display: "inline-block",
    lineHeight: "40px",
    whiteSpace: "nowrap",
    outline: "none",
    color: props => (props.isWrong ? "#da552f" : "#24b47e"),
    textShadow: "0px 0px .5px rgba(50,50,93,.25)",
    caretColor: "#0d2b3e",
    fontSize: "30px",
    fontWeight: "400",
    paddingLeft: "5px",
    verticalAlign: "middle"
  }
});

export default withStyles(styles)(Editor);
