import React, { useState, useEffect } from "react";
import { Transition } from "react-spring";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import ListHeader from "./ListHeader";
import ClientCard from "./ClientCard";

const propTypes = {
  room: PropTypes.object.isRequired,
  gameboard: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const ClientList = props => {
  const { room, gameboard, classes, socket } = props;
  const [header, setHeader] = useState({
    color: "#469cd0",
    text: "Looking for Players..."
  });

  useEffect(
    () => {
      updateHeader();
    },
    [room.roomTime, socket]
  );

  const timeRemaining = () => {
    const roomTime = room.roomTime;
    if (roomTime) {
      const text = roomTime.substring(roomTime.length - 2, roomTime.length);
      const seconds = parseInt(text);
      return seconds;
    }
  };

  const updateHeader = () => {
    const time = timeRemaining();

    if (time > 10) {
      setHeader({ color: "#469cd0", text: "Looking for Players..." });
    } else if (time > 5) {
      setHeader({ color: "#e57373", text: "Get Ready..." });
    } else if (time > 0) {
      setHeader({ color: "#e5a03e", text: "Get Set..." });
    } else if (time === 0) {
      setHeader({ color: "#81C784", text: "GO!" });
    } else if (socket.connected) {
      setHeader({ color: "#469cd0", text: "Looking for Players..." });
      return;
    } else if (socket.errored) {
      setHeader({ color: "#e57373", text: "Connection error occured" });
      return;
    } else {
      setHeader({ color: "#469cd0", text: "Connecting to server..." });
    }
  };

  return (
    <div className={classes.container}>
      {socket.connected && (
        <Transition
          items={room.clients}
          keys={item => item.id}
          from={{ overflow: "hidden", width: "0px" }}
          enter={{ width: "200px" }}
          leave={{ width: "0px" }}
        >
          {client => props => (
            <ClientCard
              style={props}
              client={client}
              color={client.gamePiece.color}
            />
          )}
        </Transition>
      )}
    </div>
  );
};

ClientList.propTypes = propTypes;

const styles = theme => ({
  container: {
    width: "100%",
    display: "Flex",
    gridRow: "1 / 2",
    gridColumn: "2 / 4",
    flexDirection: "row",
    // margin: "25px 15px 15px 15px",
    position: "relative"
  }
});

export default withStyles(styles)(ClientList);
