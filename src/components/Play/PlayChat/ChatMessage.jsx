import React from "react";
import injectSheet from "react-jss";

const ChatMessage = ({ classes, message }) => {
  return (
    <div className={classes.container}>
      <div className={classes.name}>{message.username}</div>
      <div className={classes.inner}>{message.message}</div>
    </div>
  );
};

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    minHeight: "60px",
    margin: "10px 20px 10px 20px",
    borderRadius: 8
  },
  inner: {
    // display: "inline-block",
    position: "relative",
    backgroundColor: props => props.color,
    zIndex: 21,
    alignSelf: props => props.align,
    padding: "10px",
    fontSize: "18px",
    wordWrap: "break-word",
    color: theme.primaryWhite,
    maxWidth: "75%",
    borderRadius: 8
  },
  name: {
    // display: "inline-block",
    fontSize: "14px",
    alignSelf: props => props.align,
  }
});

export default injectSheet(styles)(ChatMessage);
