import React, { Component } from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import { connect } from "react-redux";
import { updateClient } from "../actions/ClientActions";
import { initSocket } from "../actions/ClientActions";

class DashboardContainer extends Component {
  componentDidUpdate() {
    if (this.props.socket.connected) {
      this.props.history.push("/play");
    }
  }

  render() {
    return <Dashboard {...this.props} />;
  }
}

const mapStateToProps = state => ({
  client: state.client.meta,
  room: state.client.room,
  socket: state.client.socket
});

const mapDispatchToProps = dispatch => ({
  updateClient: object => dispatch(updateClient(object)),
  initSocket: username => dispatch(initSocket(username))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer);
