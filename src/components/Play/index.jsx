import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import ClientList from "./ClientList";
import Gameboard from "./Gameboard";
import Editor from "./Editor";
import Chat from "./Chat";

class Play extends React.Component {
  componentWillUnmount() {
    this.props.leaveRoom({ id: this.props.room.id });
  }

  render() {
    const { classes, room, gameboard, client, gameboardUpdate, sendChatMessage } = this.props;
    return (
      <main>
        <div className={classes.stripe} />
        <div className={classes.root}>
          <ClientList room={room} gameboard={gameboard} />
          <Gameboard
            gameboard={gameboard}
            client={client}
            room={room}
          />
          <Chat room={room} client={client} sendChatMessage={sendChatMessage} />
          <Editor
            gameboardUpdate={gameboardUpdate}
            gameboard={gameboard}
            client={client}
            room={room}
          />
        </div>
      </main>
    );
  }
}

const styles = theme => ({
  root: {
    display: "grid",
    gridTemplateColumns: "min-content auto min-content",
    gridTemplateRows: "min-content min-content min-content",
    maxWidth: "1240px",
    flexDirection: "row",
    position: "relative",
    margin: "auto",
    height: "100%"
  },
  stripe: {
    zIndex: 0,
    width: "100%",
    height: "90%",
    overflow: "hidden",
    WebkitTransform: "skwY(-12deg)",
    transform: "skewY(-12deg)",
    WebkitTransformOrigin: 0,
    transformOrigin: 0,
    backgroundColor: theme.secondaryWhite,
    position: "absolute"
  }
});

export default injectSheet(styles)(Play);
