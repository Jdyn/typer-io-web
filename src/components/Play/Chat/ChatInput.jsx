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
    height: "45px",
    lineHeight: "20px",
    border: "2px solid #e5e5e5",
    borderRadius: 16,
    // boxShadow: "0px 0px 5px rgba(30,30,70,.3) inset",
    outline: "none",
    fontSize: 18,
    padding: "0 10px",
  }
};

export default withStyles(styles)(ChatInput);
