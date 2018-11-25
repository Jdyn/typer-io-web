import React, { Component } from "react";
import Play from "../components/Play/Play";
import { connect } from "react-redux";
import { establishSocket } from "../actions/AppActions";

class PlayContainer extends Component {
  render() {
    return (
      <div>
        <Play {...this.props} />
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
    establishSocket: username =>
      dispatch(establishSocket("localhost:8000", username))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayContainer);
