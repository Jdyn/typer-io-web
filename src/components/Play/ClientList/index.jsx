import React, { useState, useEffect } from "react";
import { Transition } from "react-spring";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import ListHeader from "../ListHeader";
import ClientCard from "./ClientCard";
import Header from "../../Common/Header";

const propTypes = {
  room: PropTypes.object.isRequired,
  gameboard: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const ClientList = props => {
  const { room, gameboard, classes, socket, theme } = props;
  const [header, setHeader] = useState({
    color: "#469cd0",
    text: "Looking for Players..."
  });

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
        <Header
          boxShadow="0 5px 20px rgba(35,35,80,.25)"
          color={theme.primaryWhite}
          borderRadius="8px 8px 0px 0px"
          fontSize={24}
          backgroundColor={"#555abf"} //"#f7bb10"
          padding="10px"
        >
          Players
        </Header>
      )}

      {socket.connected && (
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
      )}
    </div>
  );
};

ClientList.propTypes = propTypes;

const styles = theme => ({
  container: {
    display: "Flex",
    flexDirection: "column",
    gridRow: "2 / 4",
    gridColumn: "1 / 2",
    margin: "0px 10px 0px 10px",
    position: "relative"
  },
  inner: {
    borderRadius: "0px 0px 8px 8px",
    backgroundColor: theme.primaryWhite,
    boxShadow: "0px 0px 30px 5px rgba(50,50,93,.25)"
  }
});

export default withStyles(styles, { injectTheme: true })(ClientList);
