import React, { Component } from "react";
import Play from "../components/Play/Play";
import { connect } from "react-redux";
import types from "../actions/types/SocketTypes";

class PlayContainer extends Component {
  componentDidMount() {
    this.props.initWebSocket(this.props.client.username);
  }

  render() {
    return <div>Hello</div>; //<Play {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    client: state.client
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initWebSocket: username =>
      dispatch({
        type: types.INIT_SOCKET_REQUEST,
        payload: { username, pending: true }
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayContainer);
