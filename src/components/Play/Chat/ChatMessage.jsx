import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";

const propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired
};

const ChatMessage = props => {
  const { classes, message } = props;

  return (
    <div className={classes.container}>
      <div className={classes.name}>{message.username}</div>
      <div className={classes.inner}>{message.message}</div>
    </div>
  );
};

ChatMessage.propTypes = propTypes

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    minHeight: "60px",
    margin: "10px 0px 10px 0px",
    borderRadius: 8
  },
  inner: props => ({
    position: "relative",
    backgroundColor: props.color,
    zIndex: 21,
    alignSelf: props.align,
    padding: "10px",
    fontSize: "18px",
    wordWrap: "break-word",
    color: theme.white,
    maxWidth: "75%",
    borderRadius: 8
  }),
  name: {
    fontSize: "14px",
    padding: "5px",
    alignSelf: props => props.align
  }
});

export default withStyles(styles)(ChatMessage);
