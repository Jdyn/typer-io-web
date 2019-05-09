import React, { Component } from "react";
import { connect } from "react-redux";
import Lobby from "../components/Lobby";

class LobbyContainer extends Component {
  componentWillMount() {}

  render() {
    return <Lobby {...this.props} />;
  }
}

const mapStateToProps = state => ({
  client: state.client.meta,
  room: state.client.room
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LobbyContainer);