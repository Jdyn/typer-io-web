import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import CommonTitle from "../../CommonComponents/commonTitle";
import CommonPaper from "../../CommonComponents/CommonPaper";
import PlayChatForm from "./PlayChatForm";
import PlayChatDisplay from "./PlayChatDisplay";

const propTypes = {
  socket: PropTypes.object.isRequired
};

class PlayChat extends React.Component {
  constructor(props) {
    super(props);
  }

  submitMessage = e => {
    e.preventDefault();
    const input = document.getElementById("chatInput");
    const message = input.value;
    this.props.socket.io.emit("message", {
      username: this.props.client.username,
      id: this.props.client.id,
      message: message
    });

    input.value = "";
  };

  render() {
    const { classes, client } = this.props;
    return (
      <div className={classes.container}>
        {/* <div className={classes.chatHeader}>CHAT ROOM</div> */}
        <div className={classes.inner}>
          <PlayChatDisplay messages={client.room.messages} clientId={client.id} />
          <PlayChatForm submitMessage={this.submitMessage} />
        </div>
      </div>
    );
  }
}

PlayChat.propTypes = propTypes;

const styles = theme => ({
  container: {
    display: "flex",
    margin: "25px 15px 15px 15px",
    position: "relative",
    width: "285px",
    maxWidth: "285px",
    gridRow: "1 / 3",
    gridColumn: "3 / 4"
  },
  inner: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.primaryWhite,
    position: "relative",
    height: "100%",
    width: "100%",
    borderRadius: 12,
    "&:before": {
      content: "''",
      display: "block",
      position: "absolute",
      borderRadius: 12,
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
    // padding: "10px 0 0px 0",
    // boxSizing: 'content-box'
    // margin: "10px 0 0 0"
    // width: "90%"
  }
});

export default injectSheet(styles)(PlayChat);
