import React, { Component } from "react";
import { connect } from "react-redux";
import types from "../constants/ActionTypes";
import Play from "../components/Play";
import { silentEmit } from "../store/socket";
import {
  initSocket,
  sendChatMessage,
  updateClient,
  leaveRoom
} from "../actions/ClientActions";

class PlayContainer extends Component {
  componentWillMount() {
    if (!this.props.socket.connected) {
      const localUsername = localStorage.getItem("username");
      this.props.initSocket(
        localUsername ? localUsername : this.props.client.username,
        this.props.match.params
      );
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
    gameboard: state.client.room.gameboard,
    socket: state.client.socket
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initSocket: (username, params) => dispatch(initSocket(username, params)),
    updateClient: username => dispatch(updateClient({ username })),
    leaveRoom: payload => leaveRoom(payload),
    sendChatMessage: payload => sendChatMessage(payload)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayContainer);
