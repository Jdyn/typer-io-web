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
  const [message, setMessage] = useState("");

  const submitMessage = event => {
    event.preventDefault();
    const payload = {
      username: client.username,
      id: client.id,
      message: message
    };
    sendChatMessage(payload);
    setMessage("");
  };

  return (
    <form className={classes.container} onSubmit={e => submitMessage(e)}>
      <input
        className={classes.input}
        type="text"
        onChange={e => setMessage(e.target.value)}
        value={message}
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
    zIndex: 10,
    margin: "auto 10px 15px 10px"
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
