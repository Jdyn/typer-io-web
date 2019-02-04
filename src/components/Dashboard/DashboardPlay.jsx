import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import DashboardPlayCard from "./DashboardPlayCard";
import withStyless from "react-jss";

const DashboardPlay = props => {
  const { classes, initSocket, socket } = props;
  const [selectedIndex, setSelectedIndex] = useState();

  const cards = [
    {
      title: "Play",
      text: "Defeat other players",
      color: "#06A978",
      selected: false,
      route: "/play"
    },
    {
      title: "Solo",
      text: "Practice your skills",
      color: "#6772e5",
      selected: false,
      route: "/"
    },
    {
      title: "Friends",
      text: "Defeat your friends",
      color: "#b76ac4",
      selected: false,
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
            initSocket(props.client.username);
            break;
          case 1:
            setSelectedIndex(index);
            break;
          case 2:
            setSelectedIndex(index);
            break;
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
          <DashboardPlayCard
            onClick={handleOnClick}
            card={card}
            key={index}
            index={index}
            selectedIndex={selectedIndex}
            pending={socket.pending}
            errored={socket.errored}
          />
        );
      })}
    </div>
  );
};

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    margin: "20px auto 20px 0 ",
    padding: "5px 5px",
    backgroundColor: theme.primaryWhite
  }
});

export default withStyless(styles)(DashboardPlay);
