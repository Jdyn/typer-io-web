import React, { Component } from "react";
import Play from "../components/Play/Play";
import { connect } from "react-redux";
import { establishSocket } from "../actions/HomeActions";

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
    socket: state.home.socket,
    client: state.app.client
  };
};

const mapDispatchToProps = dispatch => {
  return {
    establishSocket: client =>
      dispatch(establishSocket("localhost:8000", client))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayContainer);
