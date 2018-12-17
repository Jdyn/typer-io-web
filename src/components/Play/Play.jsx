import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import PlayClientList from "./PlayClientList/PlayClientList";
import PlayMain from "./PlayOverview/PlayMain";
import PlayInput from "./PlayEditor/PlayInput";
import PlayChat from "./PlayChat/PlayChat";

const propTypes = {
  socket: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  updateClientRoomChat: PropTypes.func.isRequired
};

class Play extends React.Component {

  render() {
    const { classes, client, socket } = this.props;
    const snippet = client.room.snippet;
    const snippetArray = client.room.snippet.split(" ");

    return (
      <main>
        <div className={classes.stripe} />
        <div className={classes.root}>
          <PlayClientList client={client} />
          <PlayMain snippetString={snippet} />
          <PlayChat socket={socket} client={client}/>
          <PlayInput snippetArray={snippetArray} />
        </div>
      </main>
    );
  }
}

const styles = theme => ({
  root: {
    display: "grid",
    gridTemplateColumns: "min-content auto min-content",
    gridTemplateRows: "min-content min-content",
    maxWidth: "1240px",
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
