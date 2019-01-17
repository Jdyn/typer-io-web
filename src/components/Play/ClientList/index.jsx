import React, { useState, useEffect } from "react";
import { Transition } from "react-spring";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import ListHeader from "./ListHeader";
import ClientCard from "./ClientCard";
import List from "./List";
const propTypes = {
  room: PropTypes.object.isRequired,
  gameboard: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const ClientList = props => {
  const { room, gameboard, classes } = props;
  const [header, setHeader] = useState({
    color: "#469cd0",
    text: "Looking for Players..."
  });

  useEffect(
    () => {
      updateHeader();
    },
    [room.roomTime]
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
    } else {
      setHeader({ color: "#469cd0", text: "Looking for Players..." });
    }
  };

  return (
    <div className={classes.container}>
      <ListHeader
        gameTime={gameboard.gameTime}
        roomTime={room.roomTime}
        header={header}
      />
      <div className={classes.inner}>
        <Transition
          items={room.clients}
          keys={item => item.id}
          from={{ overflow: "hidden", height: "0px" }}
          enter={{ height: "100px" }}
          leave={{ height: "0px" }}
        >
          {client => props => (
            <ClientCard
              style={props}
              client={client}
              color={client.gamePiece.color}
            />
          )}
        </Transition>
      </div>
    </div>
  );
};

ClientList.propTypes = propTypes;

const styles = theme => ({
  container: {
    width: "265px",
    maxWidth: "265px",
    margin: "25px 15px 15px 15px",
    position: "relative",
    gridRow: "1 / 4"
  },
  inner: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    backgroundColor: "transparent",
    // boxShadow: "0px 5px 30px 5px rgba(50,50,93,.25)",
    borderRadius: 8
  }
});

export default injectSheet(styles)(ClientList);
