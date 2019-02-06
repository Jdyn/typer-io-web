import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import DashboardPlayCard from "./DashboardPlayCard";
import withStyless from "react-jss";

const DashboardPlay = props => {
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
            return initSocket(props.client.username);
          case 1:
            return setSelectedIndex(index);
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
