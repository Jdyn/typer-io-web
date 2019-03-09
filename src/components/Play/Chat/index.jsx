import React from "react";
import withStyles from "react-jss";
import PropTypes from "prop-types";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import Header from "../../reusable/Header";

const propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  room: PropTypes.object.isRequired,
  sendChatMessage: PropTypes.func.isRequired
};

const Chat = props => {
  const { classes, theme, room, client, sendChatMessage } = props;

  return (
    <div className={classes.container}>
      <Header
        color={theme.primaryWhite}
        boxShadow="0 5px 20px rgba(35,35,80,.25)"
        borderRadius="8px 8px 0px 0px"
        margin="0px 0px -8px 0px"
        fontSize={24}
        height="60px"
        backgroundColor={"#555abf"}
        padding="10px 10px 0px 10px"
      >
        Chat
      </Header>
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
    gridColumn: "3 / 4"
  },
  inner: {
    display: "flex",
    backgroundColor: theme.primaryWhite,
    height: "100%",
    flexDirection: "column",
    // flexGrow: 1,
    zIndex: 150,
    position: "relative",
    borderRadius: 8,
    boxShadow: "0px 5px 25px 0px rgba(50,50,93,.25) inset"
  },
  display: {
    display: "flex",
    position: "absolute",
    height: "87%",
    width: "100%",
    flexDirection: "column",
    overflowY: "scroll",
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

export default withStyles(styles, { injectTheme: true })(Chat);
