import React, { Component } from 'react';
import { connect } from 'react-redux';
import Lobby from '../components/Lobby';
import { initSocket, sendChatMessage, leaveRoom } from '../actions/ClientActions';
import Play from "../components/Play";

class LobbyContainer extends Component {
  componentDidMount() {
    if (!this.props.socket.connected) {
      const localUsername = localStorage.getItem('username');

      if (this.props.match.params.room_id) {
        this.props.initSocket(
          {
            username: localUsername || this.props.client.username,
            token: this.props.session.token || null
          },
          { mode: 'PRIVATE', ...this.props.match.params }
        );
      } else {
        this.props.initSocket(
          {
            username: localUsername || this.props.client.username,
            token: this.props.session.token || null
          },
          { mode: 'CUSTOM', ...this.props.match.params }
        );
      }
    }
  }

  render() {
    const { room } = this.props;

    return room.isStarting ? <Play {...this.props} /> : <Lobby {...this.props} />;
  }
}

const mapStateToProps = (state) => ({
  client: state.client.meta,
  room: state.client.room,
  session: state.session,
  socket: state.client.socket,
  gameboard: state.client.room.gameboard
});

const mapDispatchToProps = (dispatch) => {
  return {
    initSocket: (username, params) => dispatch(initSocket(username, params)),
    leaveRoom: (payload) => leaveRoom(payload),
    sendChatMessage: (payload) => sendChatMessage(payload)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LobbyContainer);
