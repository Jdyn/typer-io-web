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
    display: "flex",
    position: "relative",
    height: "55px",
    zIndex: 25,
    marginTop: "15px"
  },
  input: {
    position: "relative",
    height: "100%",
    width: "100%",
    lineHeight: "20px",
    border: "1.5px solid #e5e5e5",
    boxShadow: "0px 0px 5px rgba(30,30,70,.3) inset",
    outline: "none",
    fontSize: 18,
    borderRadius: 16,
    padding: "10px",
    borderRadius: 8
  }
};

export default withStyles(styles)(ChatInput);
