import React, { Component } from "react";
import { connect } from "react-redux";
import Forum from "../components/Forum";

class ForumContainer extends Component {
  render() {
    return <Forum {...this.props} />;
  }
}

const mapStateToProps = state => ({
  client: state.client.meta,
  room: state.client.room
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForumContainer);
