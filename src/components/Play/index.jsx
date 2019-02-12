import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import ClientList from "./ClientList";
import Gameboard from "./Gameboard";
import Editor from "./Editor";
import Chat from "./Chat";
import PlayStatus from "./Status/PlayStatus";
import Leaderboard from "./Leaderboard/index";
import Context from "./Context";

const propTypes = {
  classes: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  room: PropTypes.object.isRequired,
  gameboard: PropTypes.object.isRequired,
  socket: PropTypes.object.isRequired,
  updateClient: PropTypes.func.isRequired,
  initSocket: PropTypes.func.isRequired,
  leaveRoom: PropTypes.func.isRequired,
  sendChatMessage: PropTypes.func.isRequired
};

const Play = props => {
  const {
    client,
    room,
    socket,
    gameboard,
    leaveRoom,
    sendChatMessage,
    classes
  } = props;
  const [clientIndex, setClientIndex] = useState(null);
  const [currentClient, setCurrentClient] = useState(null);

  useEffect(() => {
    return () => {
      leaveRoom({ id: room.id, errored: false });
    };
  }, []);

  useEffect(
    () => {
      setCurrentClient(
        room.clients.filter(object => object.id === client.id)[0]
      );
    },
    [client.id]
  );

  return (
    <main>
      <div className={classes.stripe} />
      <div className={classes.root}>
        <ClientList
          currentClient={currentClient}
          room={room}
          gameboard={gameboard}
          socket={socket}
        />
        <PlayStatus gameboard={gameboard} room={room} socket={socket} />
        <Leaderboard />
        <Gameboard
          clientIndex={clientIndex}
          client={client}
          room={room}
          gameboard={gameboard}
        />
        {/* <div className={classes.container}> */}
        <Chat
          client={client}
          currentClient={currentClient}
          room={room}
          sendChatMessage={sendChatMessage}
        />
        {/* <Context />
        </div> */}

        <Editor
          client={client}
          room={room}
          gameboard={gameboard}
          gameboardUpdate={setClientIndex}
        />
      </div>
    </main>
  );
};

Play.propTypes = propTypes;

const styles = theme => ({
  root: {
    display: "grid",
    gridTemplateColumns: "285px auto 285px",
    gridTemplateRows: "min-content min-content auto",

    maxWidth: "1240px",
    flexDirection: "row",
    position: "relative",
    margin: "auto",
    height: "100%"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    gridRow: "2 / 5",
    gridColumn: "3 / 4"
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
    backgroundColor: theme.tertiaryWhite,
    position: "absolute"
  }
});

export default withStyles(styles)(Play);
