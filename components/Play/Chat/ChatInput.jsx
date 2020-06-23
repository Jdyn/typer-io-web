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
    zIndex: 25,
    marginTop: "15px"
  },
  input: {
    position: "relative",
    width: "100%",
    border: "none",
    borderBottom: "2px solid #e5e5e5",
    margin: "10px",
    outline: "none",
    fontSize: 18,
    padding: "5px 10px",
  }
};

export default withStyles(styles)(ChatInput);
