import React from "react";
import withStyles from "react-jss";
import PropTypes from "prop-types";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import Header from "../../reusable/Header";

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
      <Header>Chat</Header>
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
    gridRow: "2 / 5",
    gridColumn: "3 / 4",
    marginBottom: "30px"
  },
  inner: {
    display: "flex",
    backgroundColor: theme.white,
    height: "100%",
    flexDirection: "column",
    // flexGrow: 1,
    zIndex: 150,
    position: "relative",
    borderRadius: "0 0 8px 8px",
    boxShadow: "0px 0px 25px -2px rgba(50,50,93,.3) inset"
  },
  display: {
    display: "flex",
    position: "absolute",
    height: "87%",
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
