import React, { Component } from "react";
import Home from "../components/Home/Home";
import { connect } from "react-redux";
import { establishSocket } from "../actions/AppActions";
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
  return {
    socket: state.app.socket,
    client: state.app.client
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initClient: username => dispatch(initClient(username))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
