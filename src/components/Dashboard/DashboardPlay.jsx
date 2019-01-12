import React from "react";
import PropTypes from "prop-types";
import DashboardPlayCard from "./DashboardPlayCard";
import injectSheets from "react-jss";

const DashboardPlay = props => {
  const { classes, initSocket, socket } = props;
  const options = [
    {
      title: "Play",
      text: "This is the Play Text",
      color: "#3ecf8e",
      route: "/play"
    },
    {
      title: "Solo",
      text: "This is the Solo Text",
      color: "#6772e5",
      route: "/about"
    },
    {
      title: "Friends",
      text: "This is the Friends Text",
      color: "#b76ac4",
      route: "/"
    }
  ];

  const handleOnClick = e => {
    e.preventDefault();
    if (!socket.connected) {
      initSocket(props.client.username);
    }
  };

  return (
    <div className={classes.container}>
      {options.map((object, index) => {
        const { title, text, color, route } = object;
        return (
          <DashboardPlayCard
            onClick={handleOnClick}
            navPath={route}
            title={title}
            text={text}
            backgroundColor={color}
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
