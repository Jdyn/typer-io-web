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

    return (
      client.room && (
        <main>
          <div className={classes.stripe} />
          <div className={classes.root}>
            <PlayMain snippet={client.room.snippet} />
            <PlayClientList client={client} />
            <PlayInput snippet={client.room.snippet} />
          </div>
        </main>
      )
    );
  }
}

const styles = theme => ({
  root: {
    display: "grid",
    gridTemplateColumns: "auto auto",
    gridTemplateRows: "auto auto",

    maxWidth: "1040px",
    flexDirection: "row",
    position: "relative",
    margin: "auto",
    height: "100%"
  },
  stripe: {
    zIndex: 0,
    width: "100%",
    height: "85%",
    overflow: "hidden",
    WebkitTransform: "skwY(-12deg)",
    transform: "skewY(-12deg)",
    WebkitTransformOrigin: 0,
    transformOrigin: 0,
    backgroundColor: theme.secondaryWhite,
    position: "absolute"
  }
});

Play.propTypes = propTypes;

export default injectSheet(styles)(Play);
