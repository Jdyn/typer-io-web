import React, { Component } from "react";
import Dashboard from "../components/Dashboard";
import { connect } from "react-redux";
import { updateClient, logIn, initSocket } from "../actions/ClientActions";

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
  socket: state.client.socket,
});

const mapDispatchToProps = dispatch => ({
  updateClient: object => dispatch(updateClient(object)),
  initSocket: username => dispatch(initSocket(username)),
  logIn: payload => dispatch(logIn(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer);
