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
  const { classes, initSocket, socket, history } = props;
  const [selectedIndex, setSelectedIndex] = useState();

  const cards = [
    {
      title: "Quick Play",
      text: "Play against others",
      color: "#1c91ff",
      route: "/play"
    },
    {
      title: "Solo Play",
      text: "Practice on your own",
      color: "#06A978",
      route: "/"
    },
    {
      title: "Friends",
      text: "Create a private match",
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
            setSelectedIndex(index);
            return initSocket(props.client.username, { mode: "CUSTOM" });
          default:
            break;
        }
      }
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
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
    </div>
  );
};

DashboardMenu.propTypes = propTypes;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gridArea: "menu",
    minWidth: "275px",
  },
  wrapper: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column"
  }
};

export default withStyles(styles)(DashboardMenu);
