import React from "react";
import withStyles from "react-jss";
// import PropTypes from "prop-types";
import ChatInput from "./ChatInput";
import ChatDisplay from "./ChatDisplay";
import Header from "../../Common/Header"

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
    margin: "10px 15px 15px 15px",
    position: "relative",
    width: "265px",
    gridRow: "2 / 4",
    gridColumn: "3 / 4"
  },
  inner: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.primaryWhite,
    position: "relative",
    height: "100%",
    width: "100%",
    borderRadius: "0px 0px 8px 8px",
    "&:before": {
      content: "''",
      display: "block",
      position: "absolute",
      borderRadius: "0px 0px 8px 8px",
      width: "100%",
      height: "100%",
      zIndex: 5,
      boxShadow: "0px 0px 40px 0px rgba(50,50,93,.25) inset"
    }
  },
  chatHeader: {
    position: "relative",
    height: "25px",
    textAlign: "center",
    backgroundColor: theme.primaryWhite,
    boxShadow: "0px 0px 10px 0px rgba(50,50,93,.25) ",
    borderRadius: 8
  }
});

export default withStyles(styles, { injectTheme: true })(Chat);
