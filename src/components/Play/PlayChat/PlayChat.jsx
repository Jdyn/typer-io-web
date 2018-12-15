import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import CommonTitle from "../../CommonComponents/commonTitle";
import CommonPaper from "../../CommonComponents/CommonPaper";
import PlayChatForm from "./PlayChatForm";

const propTypes = {
  socket: PropTypes.object.isRequired
};

class PlayChat extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.props.socket.io) {


      }
    }
  }

  submitMessage = (e, input) => {
    e.preventDefault();
    this.props.socket.io.emit("message", {
      id: this.props.client.id,
      message: input
    });
  };

  render() {
    const { classes, client } = this.props;
    console.log(client)
    return (
      <div className={classes.container}>
        <CommonPaper width="265px">
          <CommonTitle className={classes.title} color="black" padding="20px">
            CHAT:
          </CommonTitle>
          <div>
            {client.room.messages.map((message, index) => (
              <div key={index}>
                <p>{message.id}</p>
                <p>{message.message}</p>
              </div>
            ))}
          </div>
          <PlayChatForm submitMessage={this.submitMessage} />
        </CommonPaper>
      </div>
    );
  }
}

PlayChat.propTypes = propTypes;

const styles = theme => ({
  container: {
    display: "flex",
    position: "relative",
    margin: "25px auto auto auto"
  }
});

export default injectSheet(styles)(PlayChat);
