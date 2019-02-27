import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import ClientList from "../components/Play/ClientList";
import Gameboard from "../components/Play/Gameboard";
import Editor from "../components/Play/Editor";
import PlayStatus from "../components/Play/Status";
import Leaderboard from "../components/Play/Leaderboard";

const propTypes = {
  classes: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  room: PropTypes.object.isRequired,
  gameboard: PropTypes.object.isRequired,
  socket: PropTypes.object.isRequired,
  initSocket: PropTypes.func.isRequired,
  leaveRoom: PropTypes.func.isRequired
};

const Solo = props => {
  const { client, room, socket, gameboard, leaveRoom, classes } = props;
  const [clientIndex, setClientIndex] = useState(null);

  useEffect(() => {
    return () => {
      leaveRoom({ id: room.id, errored: false });
    };
  }, []);

  return (
    <main>
      <div className={classes.stripe} />
      <div className={classes.root}>
        <ClientList room={room} gameboard={gameboard} socket={socket} />
        <PlayStatus gameboard={gameboard} room={room} socket={socket} />
        <Gameboard
          clientIndex={clientIndex}
          client={client}
          room={room}
          gameboard={gameboard}
        />
        <Leaderboard isSolo={true} />
        <Editor
          client={client}
          room={room}
          socket={socket}
          gameboard={gameboard}
          gameboardUpdate={setClientIndex}
        />
      </div>
    </main>
  );
};

Solo.propTypes = propTypes;

const styles = theme => ({
  root: {
    display: "grid",
    gridTemplateColumns: "285px auto 285px",
    gridTemplateRows: "min-content min-content auto",
    gridGap: "15px",
    maxWidth: "1185px",
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

export default withStyles(styles)(Solo);
