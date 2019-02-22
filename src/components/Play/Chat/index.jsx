import React from "react";
import withStyles from "react-jss";
import PropTypes from "prop-types";
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
      <ChatDisplay
        sendChatMessage={sendChatMessage}
        messages={room.messages}
        client={client}
      />
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
    // flexGrow: 1
  },
  inner: {
    display: "flex",
    flexDirection: "column",
    // flexGrow: 1,
    zIndex: 150,
    backgroundColor: theme.primaryWhite,
    position: "relative",
    width: "100%",
    borderRadius: 8,
    boxShadow: "0px 5px 25px 0px rgba(50,50,93,.25) inset"
  }
});

export default withStyles(styles, { injectTheme: true })(Chat);
