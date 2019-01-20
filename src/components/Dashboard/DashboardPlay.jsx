import React from "react";
// import PropTypes from "prop-types";
import DashboardPlayCard from "./DashboardPlayCard";
import injectSheets from "react-jss";

const DashboardPlay = props => {
  const { classes, initSocket, socket } = props;
  const cards = [
    {
      title: "Play",
      text: "Defeat other players",
      color: "#06A978",
      route: "/play"
    },
    {
      title: "Solo",
      text: "Practice your skills",
      color: "#6772e5",
      route: "/"
    },
    {
      title: "Friends",
      text: "Defeat your friends",
      color: "#b76ac4",
      route: "/"
    }
  ];

  const handleOnClick = (event, navPath) => {
    event.preventDefault();
    if (!socket.connected) {
      switch (navPath) {
        case "/play":
          initSocket(props.client.username);
          break
        default: break
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
            pending={socket.pending}
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
    maxWidth: "1160px",
    backgroundColor: theme.primaryWhite
  }
});

export default injectSheets(styles)(DashboardPlay);
