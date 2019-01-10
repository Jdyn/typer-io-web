import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import ClientList from "./ClientList";
import Gameboard from "./Gameboard";
import Editor from "./Editor";
import Chat from "./Chat";

class Play extends React.Component {
  constructor(props) {
    super(props);
    const { room } = props;
    this.state = {
      clientIndex: null,
      snippet: room.snippet.split(" ")
    };
  }

  componentWillUnmount() {
    this.props.leaveRoom({ id: this.props.room.id });
  }

  updateGameboard = newIndex => {
    this.setState({ clientIndex: newIndex });
  };

  render() {
    const { classes, isStarted, client } = this.props;
    const { snippet } = this.state;

    return (
      <main>
        <div className={classes.stripe} />
        <div className={classes.root}>
          {/* <ClientList client={client} />
          <Gameboard
            snippet={snippet}
            client={client}
            clientIndex={this.state.clientIndex}
          />
          <Chat client={client} />
          <Editor
            isStarted={isStarted}
            snippet={snippet}
            updateGameboard={this.updateGameboard}
          /> */}
        </div>
      </main>
    );
  }
}

const styles = theme => ({
  root: {
    display: "grid",
    gridTemplateColumns: "min-content auto min-content",
    gridTemplateRows: "min-content min-content min-content",
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
    WebkitTransformOrigin: 0,
    transformOrigin: 0,
    backgroundColor: theme.secondaryWhite,
    position: "absolute"
  }
});

export default injectSheet(styles)(Play);
