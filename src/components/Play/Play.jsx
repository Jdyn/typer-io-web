import React from "react";
import PropTypes from "prop-types";
import DashboardPaper from "../Dashboard/DashboardPaper";
import injectSheet from "react-jss";

const propTypes = {
  socket: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  connectSocket: PropTypes.func.isRequired,
  disconnectSocket: PropTypes.func.isRequired
};

class Play extends React.Component {
  componentWillMount() {
    this.props.connectSocket(this.props.client);
  }

  componentWillUnmount() {
    // this.props.disconnectSocket(this.props.socket.io, this.props.client);
    console.log('component dismounted and disconnect socket called')
  }

  render() {
    const { classes, client } = this.props;
    return (
      <div className={classes.root}>
        <DashboardPaper>
          <h2>{client.username}</h2>
          <h4>{client.id}</h4>
        </DashboardPaper>
        {console.log(client.room.clients)}
        {client.room ? (
          client.room.clients.map(client => (
            <DashboardPaper>{client.id}</DashboardPaper>
          ))
        ) : (
          <div>rip </div>
        )}
      </div>
    );
  }
}

const styles = {
  root: {
    display: "flex",
    position: "relative"
  }
};

Play.propTypes = propTypes;

export default injectSheet(styles)(Play);
