import React, { Component } from "react";
import Dashboard from "../components/Dashboard";
import { connect } from "react-redux";
import { updateClient, initSocket } from "../actions/ClientActions";
import { login, logout, signup, clearSessionErrors } from "../actions/SessionActions";
import { deleteMatch } from "../actions/MatchHistoryActions";

class DashboardContainer extends Component {
  componentDidUpdate() {
    if (this.props.socket.connected) {
      switch (this.props.socket.mode) {
        case "MULTIPLAYER":
          this.props.history.push("/play");
          break;
        case "SOLO":
          this.props.history.push("/solo");
          break;
        default:
          break;
      }
    }
  }

  render() {
    return <Dashboard {...this.props} />;
  }
}

const mapStateToProps = state => ({
  client: state.client.meta,
  matches: state.matchHistory.matches,
  session: state.session,
  room: state.client.room,
  socket: state.client.socket
});

const mapDispatchToProps = dispatch => ({
  updateClient: object => dispatch(updateClient(object)),
  initSocket: (username, params) => dispatch(initSocket(username, params)),
  login: form => dispatch(login(form)),
  signup: form => dispatch(signup(form)),
  logout: () => dispatch(logout()),
  deleteMatch: index => dispatch(deleteMatch(index)),
  clearSessionErrors: () => dispatch(clearSessionErrors())
}); 

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer);
