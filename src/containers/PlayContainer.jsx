import React, { Component } from "react";
import Play from "../components/Play/Play";
import { connect } from "react-redux";
import { connectSocket, disconnectSocket } from "../actions/AppActions";

class PlayContainer extends Component {
  render() {
    return (
      <div>
        <Play {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    socket: state.app.socket,
    client: state.app.client
  };
};

const mapDispatchToProps = dispatch => {
  const serverUrl = "localhost:8000";
  return {
    connectSocket: username => dispatch(connectSocket(serverUrl, username)),
    disconnectSocket: (socket, client) =>
      dispatch(disconnectSocket(socket, client))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayContainer);
