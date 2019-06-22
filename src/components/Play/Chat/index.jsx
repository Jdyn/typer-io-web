import React, { useEffect } from "react";
import withStyles from "react-jss";
import PropTypes from "prop-types";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import Banner from "../../reusable/Banner";

const propTypes = {
  classes: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  room: PropTypes.object.isRequired,
  sendChatMessage: PropTypes.func.isRequired
};

const Chat = props => {
  const { classes, room, client, sendChatMessage } = props;

  useEffect(() => {
    const display = document.getElementById("chat");

    display.scrollTop = display.scrollHeight;
  }, [room.messages]);

  return (
    <div className={classes.container}>
      <Banner>Chat</Banner>
      <div id="chat" className={classes.display}>
        {room.messages.map((message, index) => (
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

Chat.propTypes = propTypes;

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "0px 0px 0px 0px",
    position: "relative",
    gridArea: "chat",
    boxShadow: "0px 10px 15px 0px rgba(30,30,70,.3)",
    padding: "20px",
    height: "560px",
    maxHeight: "560px",
    backgroundColor: theme.white,
    borderRadius: 16
  },
  display: {
    display: "flex",
    position: "relative",
    flexGrow: 1,
    maxHeight: "395px",
    flexDirection: "column",
    overflowY: "scroll",
    padding: "20px 0",
    paddingLeft: "15px",
    border: "2px solid #e5e5e5",
    // boxShadow: "0px 0px 5px rgba(30,30,70,.3) inset",
    borderRadius: 16,
    "&::-webkit-scrollbar": {
      width: "8px",
      height: "16px",
      // backgroundColor: "#ddd"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#b4b4b4",
      borderRadius: 16,
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,.2)"
    },
    "&::-webkit-scrollbar-track": {
      // backgroundColor: theme.primary, 
      // webkitBoxShadow: "inset 0 0 6px transparent",
    },
    "&::-webkit-scrollbar-button": {
      width: "0",
      height: "0",
      display: "none"
    }
  }
});

export default withStyles(styles)(Chat);
