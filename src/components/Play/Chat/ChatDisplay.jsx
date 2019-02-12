import React, { useEffect } from "react";
import withStyles from "react-jss";
import ChatMessage from "./ChatMessage";

const ChatDisplay = props => {
  const { classes, messages, client, currentClient, room } = props;

  useEffect(
    () => {
      const display = document.getElementById("chatDisplay");
      display.scrollTop = display.scrollHeight;
    },
    [messages]
  );

  return (
    <div className={classes.container}>
      <div id="chatDisplay" className={classes.inner}>
        {messages.map((message, index) => (
          <ChatMessage
            message={message}
            key={index}
            color={message.color} 
            align={client.id === message.id ? "flex-end" : "flex-start"}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "inline-block",
    position: "relative",
    height: "100%",
    paddingLeft: "20px",
    maxWidth: "100%",
    overflow: "hidden",
    zIndex: 20,
    margin: "0px 10px 0px 10px"
  },
  inner: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    zIndex: 20,
    width: "100%",
    height: "100%",
    borderBox: "content-box",
    overflowY: "auto",
    overflowX: "hidden"
  }
};

export default withStyles(styles)(ChatDisplay);
