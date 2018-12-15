import React, { Component } from "react";
import Play from "../components/Play/Play";
import { connect } from "react-redux";
import {
  connectSocket,
  disconnectSocket,
  updateClientRoomChat
} from "../actions/AppActions";

class PlayContainer extends Component {
  componentWillMount() {
    this.props.connectSocket(this.props.client);
  }

  componentWillUnmount() {
    if (this.props.socket.io) {
      this.props.disconnectSocket(this.props.socket.io, this.props.client);
    }
  }

  render() {
    return <Play {...this.props} />;
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
      dispatch(disconnectSocket(socket, client)),
    updateClientRoomChat: () => dispatch(updateClientRoomChat())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayContainer);
