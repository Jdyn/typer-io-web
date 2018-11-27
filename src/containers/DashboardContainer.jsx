import React, { Component } from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import { connect } from "react-redux";
import { initClient } from "../actions/AppActions";

class DashboardContainer extends Component {
  render() {
    return (
      <div>
        <Dashboard {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  socket: state.app.socket,
  client: state.app.client
});

const mapDispatchToProps = dispatch => ({
  initClient: username => dispatch(initClient(username))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer);
