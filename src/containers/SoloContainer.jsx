import React, { Component } from "react";
import { connect } from "react-redux";
import Solo from "../components/Solo";
import { initSocket, leaveRoom } from "../actions/ClientActions";

class SoloContainer extends Component {
  componentWillMount() {
    if (!this.props.socket.connected) {
      const localUsername = localStorage.getItem("username");
      this.props.initSocket(
        localUsername ? localUsername : this.props.client.username,
        { mode: "SOLO", ...this.props.match.params }
      );
    }
  }

  render() {
    return <Solo {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    client: state.client.meta,
    room: state.client.room,
    gameboard: state.client.room.gameboard,
    socket: state.client.socket
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initSocket: (username, params) => dispatch(initSocket(username, params)),
    leaveRoom: payload => leaveRoom(payload)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SoloContainer);
