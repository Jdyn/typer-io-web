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
      <div className={classes.container}>
        <div id="chatDisplay" className={classes.inner}>
          {messages.map((message, index) => (
            <ChatMessage
              message={message}
              key={index}
              color={clientId === message.id ? "#6ed69a" : "#007bff"}
              align={clientId === message.id ? "flex-end" : "flex-start"}
            />
          ))}
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    display: "inline-block",
    position: "relative",
    height: "100%",
    paddingLeft: "25px",
    maxWidth: "100%",
    overflow: "hidden",
    zIndex: 20,
    margin: "15px 10px 15px 10px"
  },
  inner: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    zIndex: 20,
    width: "100%",
    height: "100%",
    borderBox: "content-box",
    overflowY: "scroll",
    overflowX: "hidden"
  }
};

export default injectSheet(styles)(PlayChatDisplay);
