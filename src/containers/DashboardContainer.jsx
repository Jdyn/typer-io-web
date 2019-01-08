import React, { Component } from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import { connect } from "react-redux";
import { updateClient } from "../actions/ClientActions";

class DashboardContainer extends Component {
  render() {
    return <Dashboard {...this.props} />;
  }
}

const mapStateToProps = state => ({
  client: state.client
});

const mapDispatchToProps = dispatch => ({
  updateClient: object => dispatch(updateClient(object))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer);
