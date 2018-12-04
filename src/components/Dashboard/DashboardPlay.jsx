import React from "react";
import PropTypes from "prop-types";
import DashboardPlayCard from "./DashboardPlayCard";
import injectSheets from "react-jss";

const propTypes = {
  username: PropTypes.string,
  socket: PropTypes.object
};

const DashboardPlay = props => {
  const { classes, socket } = props;

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
      route: "/"
    },
    {
      title: "Friends",
      text: "This is the Friends Text",
      color: "#b76ac4",
      route: "/"
    }
  ];

  const handleOnClick = e => {
    console.log("Link was clicked");
    
      if (props.socket.hasErrored) {
        e.perventDefault()
      }
  };

  return (
    <div className={classes.container}>
      {true &&
        options.map((object, index) => {
          const { title, text, color, route } = object;
          return (
            <DashboardPlayCard
              hasErrored={socket.hasErrored}
              inProgress={socket.inProgress}
              handleOnClick={handleOnClick}
              navPath={route}
              title={title}
              text={text}
              backgroundColor={color}
              key={index}
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
    padding: ["5px", "5px"],
    maxWidth: "1160px",
    backgroundColor: theme.primaryWhite
  }
});

DashboardPlay.propTypes = propTypes;
export default injectSheets(styles)(DashboardPlay);
