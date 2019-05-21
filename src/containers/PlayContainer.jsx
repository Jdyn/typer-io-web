import React, { Component } from "react";
import { connect } from "react-redux";
import Play from "../components/Play";
import { saveMatch } from "../actions/MatchHistoryActions";
import { initSocket, sendChatMessage, leaveRoom } from "../actions/ClientActions";

class PlayContainer extends Component {
  componentWillMount() {
    console.log(this.props.session.token)

    if (!this.props.socket.connected) {
      const localUsername = localStorage.getItem("username");
      this.props.initSocket(
        {
          username: localUsername ? localUsername : this.props.client.username,
          token: this.props.session.token || null
        },
        { mode: "MULTIPLAYER", ...this.props.match.params }
      );
    }
  }

  // componentWillUnmount() {
  //   console.log("component did unmount")
  //   this.props.leaveRoom({ id: this.props.room.id, errored: false });
  // }

  render() {
    return <Play {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    client: state.client.meta,
    session: state.session,
    room: state.client.room,
    snippet: state.client.room.snippet,
    gameboard: state.client.room.gameboard,
    socket: state.client.socket
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initSocket: (username, params) => dispatch(initSocket(username, params)),
    leaveRoom: payload => leaveRoom(payload),
    sendChatMessage: payload => sendChatMessage(payload),
    saveMatch: (payload, snippet) => dispatch(saveMatch(payload, snippet))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayContainer);
