import React, { Component } from "react";
import Home from "../components/Home";
import { connect } from "react-redux";
import { establishSocket } from "../actions/HomeActions";
import { initClient } from "../actions/AppActions";

class HomeContainer extends Component {
  render() {
    return (
      <div>
        <Home {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.home.socket);
  return {
    hasErrored: state.home.hasErrored,
    inProgress: state.home.inProgress,
    socket: state.home.socket,
    client: state.app.client
  };
};

const mapDispatchToProps = dispatch => {
  return {
    establishSocket: client =>
      dispatch(establishSocket("localhost:8000", client)),
    initClient: username => dispatch(initClient(username))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
