import React from "react";
import injectSheet from "react-jss";
import ChatMessage from "./ChatMessage";

const PlayChatDisplay = props => {
  const { classes, messages, clientId } = props;
  return (
    <div className={classes.container}>
      {messages.map((message, index) => (
        <ChatMessage
          message={message}
          key={index}
          color={clientId === message.id ? "#6ed69a" : "#007bff"}
          align={clientId === message.id ? "flex-end" : "flex-start"}
        />
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    margin: "0px 10px 0px 10px",
    height: "100%",
    maxWidth: "100%"
  }
};

export default injectSheet(styles)(PlayChatDisplay);
