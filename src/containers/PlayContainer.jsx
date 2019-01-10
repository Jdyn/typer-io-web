import React, { Component } from "react";
import { connect } from "react-redux";
import types from "../constants/ActionTypes";
import Play from "../components/Play/Play";
import { initSocket } from "../actions/ClientActions";
import { leaveRoom } from "../store/socket";

class PlayContainer extends Component {
  componentWillMount() {
    if (!this.props.socket.connected) {
      this.props.initSocket(this.props.client.username);
    }
  }

  render() {
    return <Play {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    client: state.client.meta,
    room: state.client.room,
    socket: state.client.socket
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initSocket: username => dispatch(initSocket(username)),
    leaveRoom: payload => leaveRoom(payload)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayContainer);
