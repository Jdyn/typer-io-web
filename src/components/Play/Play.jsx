import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import PlayClientList from "./PlayClientList";
import PlayMain from "./PlayMain";
import PlayInput from "./PlayInput";

const propTypes = {
  socket: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  connectSocket: PropTypes.func.isRequired,
  disconnectSocket: PropTypes.func.isRequired
};

class Play extends React.Component {
  render() {
    const { classes, client } = this.props;
    
    // Set Snippet to an empty 2D array if we have not received the snippet yet.
    const snippet = client.room
      ? client.room.snippet
      : "";

    return (
      <main>
        <div className={classes.stripe} />
        <div className={classes.root}>
          <PlayMain snippet={snippet} />
          <PlayClientList client={client} />
          <PlayInput snippet={snippet} />
        </div>
      </main>
    );
  }
}

const styles = theme => ({
  root: {
    display: "grid",
    gridTemplateColumns: "auto auto",
    gridTemplateRows: "auto auto",

    maxWidth: "1140px",
    flexDirection: "row",
    position: "relative",
    margin: "auto",
    height: "100%"
  },
  stripe: {
    zIndex: 0,
    width: "100%",
    height: "90%",
    overflow: "hidden",
    WebkitTransform: "skwY(-12deg)",
    transform: "skewY(-12deg)",
    // boxShadow: "0px 0px 40px 0px rgba(50,50,93,.25) ",
    WebkitTransformOrigin: 0,
    transformOrigin: 0,
    backgroundColor: theme.secondaryWhite,
    position: "absolute"
  }
});

Play.propTypes = propTypes;

export default injectSheet(styles)(Play);
