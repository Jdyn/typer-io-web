import React from "react";
import withStyles from "react-jss";
// import PropTypes from "prop-types";
import ChatInput from "./ChatInput";
import ChatDisplay from "./ChatDisplay";
import Header from "../../Common/Header";

class Chat extends React.Component {
  submitMessage = e => {
    e.preventDefault();
    const input = document.getElementById("chatInput");
    const message = input.value;
    this.props.sendChatMessage({
      username: this.props.client.username,
      id: this.props.client.id,
      message: message
    });

    input.value = "";
  };

  render() {
    const { classes, room, client, theme } = this.props;
    return (
      <div className={classes.container}>
        <Header
          boxShadow="0 5px 20px rgba(35,35,80,.25)"
          color={theme.primaryWhite}
          borderRadius="8px 8px 0px 0px"
          fontSize={24}
          backgroundColor={"#555abf"} //"#f7bb10"
          padding="10px"
        >
          Chat
        </Header>
        <div className={classes.inner}>
          <ChatDisplay messages={room.messages} client={client} />
          <ChatInput submitMessage={this.submitMessage} />
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "20px 10px 10px 10px",
    position: "relative",
    width: "275px",
    gridRow: "3 / 4",
    gridColumn: "3 / 4"
  },
  inner: {
    display: "flex",
    flexDirection: "column",
    zIndex: 10,
    // border: "1px solid rgba(0,0,0,.1)",
    backgroundColor: theme.primaryWhite,
    position: "relative",
    height: "100%",
    width: "100%",
    borderRadius: "0px 0px 8px 8px",
    boxShadow: "0px 0px 40px 0px rgba(50,50,93,.25) inset",
  }
});

export default withStyles(styles, { injectTheme: true })(Chat);
