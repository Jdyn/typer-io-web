import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import ClientList from "./ClientList";
import Gameboard from "./Gameboard";
import Editor from "./Editor";
import Chat from "./Chat";

const propTypes = {
  socket: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  updateRoomChat: PropTypes.func.isRequired
};

class Play extends React.Component {

  render() {
    const { classes, client, socket } = this.props;
    const snippet = client.room.snippet;
    const snippetArray = client.room.snippet ? client.room.snippet.split(" ") : [];
    const isStarted = client.room.gameboard.isStarted

    return (
      <main>
        <div className={classes.stripe} />
        <div className={classes.root}>
          <ClientList socket={socket} client={client} />
          <Gameboard snippetString={snippet} client={client}/>
          <Chat socket={socket} client={client} />
          <Editor
            isStarted={isStarted}
            socket={socket}
            snippetArray={snippetArray}
          />
        </div>
      </main>
    );
  }
}

const styles = theme => ({
  root: {
    display: "grid",
    gridTemplateColumns: "auto auto auto",
    gridTemplateRows: "min-content min-content",
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

Play.propTypes = propTypes;

export default injectSheet(styles)(Play);
