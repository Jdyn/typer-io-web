import React, { useEffect } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

const propTypes = {
  classes: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  messages: PropTypes.array.isRequired,
  sendChatMessage: PropTypes.func.isRequired
};

const ChatDisplay = props => {
  const { classes, client, messages, sendChatMessage } = props;

  useEffect(() => {
    const display = document.getElementById("chat");
    display.scrollTop = display.scrollHeight;
  }, [messages]);

  return (
    <div className={classes.container}>
      <div id="chat" className={classes.inner}>
        {messages.map((message, index) => (
          <ChatMessage
            message={message}
            key={index}
            color={message.color}
            align={client.id === message.id ? "flex-end" : "flex-start"}
          />
        ))}
      </div>
      <ChatInput sendChatMessage={sendChatMessage} client={client} />
    </div>
  );
};

ChatDisplay.propTypes = propTypes;

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    zIndex: 150,
    maxHeight: "455px",
    backgroundColor: theme.primaryWhite,
    position: "relative",
    width: "100%",
    borderRadius: 8,
    boxShadow: "0px 5px 25px 0px rgba(50,50,93,.25) inset"
  },
  inner: {
    height: "400px",
    maxHeight: "400px",
    // paddingRight: "16px",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "10px",
      height: "16px"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,0.2)"
    },
    "&::-webkit-scrollbar-button": {
      width: "0",
      height: "0",
      display: "none"
    }
  }
});

export default withStyles(styles)(ChatDisplay);
