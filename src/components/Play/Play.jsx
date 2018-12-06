import React from "react";
import PropTypes from "prop-types";
import CommonPaper from "../CommonComponents/CommonPaper";
import injectSheet from "react-jss";
import PlayClientList from "./PlayClientList";
import PlayMain from "./PlayMain";

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
      <div className={classes.root}>
        <PlayMain />
        <PlayClientList client={client} />
      </div>
    );
  }
}

const styles = {
  root: {
    display: "flex",
    maxWidth: "1040px",
    flexDirection: "row",
    position: "relative",
    margin: "auto",
    height: "100%"
  }
};

Play.propTypes = propTypes;

export default injectSheet(styles)(Play);
