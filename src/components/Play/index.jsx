import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import ClientList from "./ClientList";
import Gameboard from "./Gameboard";
import Editor from "./Editor";
import Chat from "./Chat";
import Paper from "../Common/Paper";
import ListHeader from "./ClientList/ListHeader";

const propTypes = {
  client: PropTypes.object.isRequired,
  room: PropTypes.object.isRequired,
  gameboard: PropTypes.object.isRequired,
  socket: PropTypes.object.isRequired,
  updateClient: PropTypes.func.isRequired,
  initSocket: PropTypes.func.isRequired,
  leaveRoom: PropTypes.func.isRequired,
  sendChatMessage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const Play = props => {
  const [clientIndex, setClientIndex] = useState(null);
  const {
    client,
    room,
    socket,
    gameboard,
    leaveRoom,
    sendChatMessage,
    classes
  } = props;

  useEffect(() => {
    return () => {
      leaveRoom({ id: room.id });
    };
  }, []);

  return (
    <main>
      <div className={classes.stripe} />
      <div className={classes.root}>
        <ClientList room={room} gameboard={gameboard} socket={socket} />
        <div className={classes.paper}>
        {/* <ListHeader></ListHeader> */}
          <Paper />
        </div>
        <Gameboard
          clientIndex={clientIndex}
          client={client}
          room={room}
          gameboard={gameboard}
        />
        <Chat client={client} room={room} sendChatMessage={sendChatMessage} />
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
    gridTemplateColumns: "min-content auto min-content",
    gridTemplateRows: "min-content 500px min-content",
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
    backgroundColor: theme.tertiaryWhite,
    position: "absolute"
  },
  paper: {
    gridRow: "2 / 4",
    gridColumn: "1 / ",
    height: "90%",
    width: "275px"
  }
});

export default withStyles(styles)(Play);
