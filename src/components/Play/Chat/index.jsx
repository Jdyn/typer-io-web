import React from "react";
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

  return (
    <div className={classes.container}>
      <Banner>Chat</Banner>
      <div className={classes.inner}>
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
  },
  inner: {
    display: "flex",
    backgroundColor: theme.white,
    height: "100%",
    flexDirection: "column",
    zIndex: 100,
    position: "relative",
    borderRadius: "0 0 8px 8px",
    border: "2px solid rgb(0,0,0,.1)",
    borderTop: "none",
    boxShadow: "0px -5px 15px 0px rgba(30,30,73,.3) inset",
  },
  display: {
    display: "flex",
    position: "absolute",
    height: "80%",
    zIndex: 50,
    width: "100%",
    flexDirection: "column",
    overflowY: "auto",
    padding: "0 10px 0px 20px",
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

export default withStyles(styles)(Chat);
