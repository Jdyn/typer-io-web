import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import PlayClientList from "./PlayClientList/PlayClientList";
import PlayMain from "./PlayOverview/PlayMain";
import PlayInput from "./PlayEditor/PlayInput";

const propTypes = {
  socket: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  connectSocket: PropTypes.func.isRequired,
  disconnectSocket: PropTypes.func.isRequired
};

class Play extends React.Component {
  render() {
    const { classes, client } = this.props;
    const snippet = client.room.snippet;
    const snippetArray = client.room.snippet.split(" ");

    return (
      <main>
        <div className={classes.stripe} />
        <div className={classes.root}>
          <PlayMain snippetString={snippet} />
          <PlayClientList client={client} />
          {client.room.snippet && <PlayInput snippetArray={snippetArray} />}
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
