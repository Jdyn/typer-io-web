import React from "react";
import injectSheet from "react-jss";
import ChatMessage from "./ChatMessage";

class PlayChatDisplay extends React.Component {
  componentDidUpdate() {
    const display = document.getElementById("chatDisplay");
    display.scrollTop = display.scrollHeight;
  }

  render() {
    const { classes, messages, clientId } = this.props;

    return (
      <div id="chatDisplay" className={classes.container}>
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
  }
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    margin: "15px 10px 15px 10px",
    height: "450px",
    zIndex: 20,
    maxWidth: "100%",
    overflowY: "scroll",
    overflowX: "hidden"
  }
};

export default injectSheet(styles)(PlayChatDisplay);
