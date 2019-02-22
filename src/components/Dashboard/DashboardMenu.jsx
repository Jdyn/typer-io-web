import React, { useState } from "react";
import PropTypes from "prop-types";
import MenuCard from "./MenuCard";
import withStyles from "react-jss";

const propTypes = {
  classes: PropTypes.object.isRequired,
  socket: PropTypes.object.isRequired,
  initSocket: PropTypes.func.isRequired
};

const DashboardMenu = props => {
  const { classes, initSocket, socket } = props;
  const [selectedIndex, setSelectedIndex] = useState();

  const cards = [
    {
      title: "Quick Play",
      text: "Play against other players",
      color: "#06A978",
      route: "/play"
    },
    {
      title: "Solo Play",
      text: "Practice on your own",
      color: "#6772e5",
      route: "/"
    },
    {
      title: "Friends",
      text: "Play against your friends",
      color: "#b76ac4",
      route: "/"
    }
  ];

  const handleOnClick = (event, index) => {
    event.preventDefault();
    if (!socket.pending) {
      if (!socket.connected) {
        switch (index) {
          case 0:
            setSelectedIndex(index);
            return initSocket(props.client.username, { mode: "MULTIPLAYER" });
          case 1:
            setSelectedIndex(index);
            return initSocket(props.client.username, { mode: "SOLO" });
          case 2:
            return setSelectedIndex(index);
          default:
            break;
        }
      }
    }
  };

  return (
    <div className={classes.container}>
      {cards.map((card, index) => {
        return (
          <MenuCard
            key={index}
            index={index}
            onClick={handleOnClick}
            selectedIndex={selectedIndex}
            card={card}
            socket={socket}
          />
        );
      })}
    </div>
  );
};

DashboardMenu.propTypes = propTypes;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "15px auto auto 20px"
  }
};

export default withStyles(styles)(DashboardMenu);
