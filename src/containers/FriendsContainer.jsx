import React, { Component } from "react";
import { connect } from "react-redux";
import Friends from "../components/Friends/";

class FriendsContainer extends Component {
  componentWillMount() {}

  render() {
    return <Friends {...this.props} />;
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
)(FriendsContainer);
