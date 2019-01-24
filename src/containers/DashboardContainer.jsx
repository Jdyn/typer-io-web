import React, { Component } from "react";
import Dashboard from "../components/Dashboard";
import { connect } from "react-redux";
import { updateClient, login, initSocket, logout } from "../actions/ClientActions";

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
  session: state.client.meta.session,
  room: state.client.room,
  socket: state.client.socket,
});

const mapDispatchToProps = dispatch => ({
  updateClient: object => dispatch(updateClient(object)),
  initSocket: username => dispatch(initSocket(username)),
  login: payload => dispatch(login(payload)),
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer);
