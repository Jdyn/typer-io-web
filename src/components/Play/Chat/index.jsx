import React from "react";
import withStyles from "react-jss";
import PropTypes from "prop-types";
import ChatInput from "./ChatInput";
import ChatDisplay from "./ChatDisplay";
import Header from "../../Common/Header";

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
        boxShadow="0 5px 20px rgba(35,35,80,.25)"
        margin="0px 0px -8px 0px"
        height="67px"
        color={theme.primaryWhite}
        borderRadius="8px 8px 0px 0px"
        fontSize={24}
        backgroundColor={"#555abf"}
        padding="10px"
      >
        Chat
      </Header>
      <div className={classes.inner}>
        <ChatDisplay messages={room.messages} client={client} />
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
    margin: "0px 10px 10px 10px",
    position: "relative",
    gridRow: "2 / 5",
    gridColumn: "3 / 4"
  },
  inner: {
    display: "flex",
    flexDirection: "column",
    zIndex: 150,
    backgroundColor: theme.primaryWhite,
    position: "relative",
    height: "100%",
    width: "100%",
    borderRadius: 8,
    boxShadow: "0px 10px 40px 0px rgba(50,50,93,.25) inset"
  }
});

export default withStyles(styles, { injectTheme: true })(Chat);
