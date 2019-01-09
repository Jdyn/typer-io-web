import React, { Component } from "react";
import Play from "../components/Play/Play";
import { connect } from "react-redux";
import {
  connectSocket,
  disconnectSocket,
  updateRoomChat
} from "../actions/AppActions";

import { init } from "../actions/ClientActions";

class PlayContainer extends Component {
  // componentWillMount() {
  //   this.props.connectSocket(this.props.client);
  // }

  componentDidMount() {
    this.props.initWebSocket()
  }

  // componentWillUnmount() {
  //   if (this.props.socket.io) {
  //     this.props.disconnectSocket(this.props.socket.io, this.props.client);
  //   }
  // }

  render() {
    return <div>Hello</div>//<Play {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    // socket: state.app.socket,
    // client: state.app.client,
    // snippet: state.app.client.room.snippet
  };
};

const mapDispatchToProps = dispatch => {
  const serverUrl = "localhost:8000";
  return {
    initWebSocket: serverUrl => dispatch(init(serverUrl, dispatch))
    // connectSocket: username => dispatch(connectSocket(serverUrl, username)),
    // disconnectSocket: (socket, client) => dispatch(disconnectSocket(socket, client)),
    // updateRoomChat: () => dispatch(updateRoomChat())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayContainer);
