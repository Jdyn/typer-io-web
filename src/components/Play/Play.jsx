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
    console.log("component dismounted and disconnect socket called");
    this.props.disconnectSocket(this.props.socket.io, this.props.client);
  }


  render() {
    const { classes, client } = this.props;
    return (
      <div className={classes.root}>
        {client.room ? (
          client.room.clients.map(client => (
            <DashboardPaper key={client.id}>
              <h2>{client.username}</h2>
              <h4>{client.id}</h4>
            </DashboardPaper>
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
    flexDirection: 'row',
    position: "relative"
  }
};

Play.propTypes = propTypes;

export default injectSheet(styles)(Play);
