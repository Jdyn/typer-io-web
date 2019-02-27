import React, { useState } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";

const propTypes = {
  classes: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  sendChatMessage: PropTypes.func.isRequired
};

const ChatInput = props => {
  const { classes, sendChatMessage, client } = props;
  const [input, setInput] = useState("");

  const submitMessage = event => {
    event.preventDefault();
    const payload = {
      username: client.username,
      id: client.id,
      message: input
    };
    sendChatMessage(payload);
    setInput("");
  };

  return (
    <form className={classes.container} onSubmit={e => submitMessage(e)}>
      <input
        className={classes.input}
        type="text"
        onChange={e => setInput(e.target.value)}
        value={input}
        placeholder="Write a message..."
        required
      />
    </form>
  );
};

ChatInput.propTypes = propTypes;

const styles = {
  container: {
    position: "relative",
    height: "45px",
    display: "flex",
    zIndex: 25,
    margin: "auto 15px 15px 15px"
  },
  input: {
    position: "relative",
    height: "100%",
    width: "100%",
    lineHeight: "20px",
    border: "none",
    outline: "none",
    fontSize: "18px",
    boxShadow: "0px 0px 10px 0px rgba(50,50,93,.25)",
    padding: "10px",
    borderRadius: 8
  }
};

export default withStyles(styles)(ChatInput);
