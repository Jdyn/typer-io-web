import React, { Component } from "react";
import { connect } from "react-redux";
import Friends from "../components/Friends/";

class FriendsContainer extends Component {
  componentWillMount() {}

  render() {
    return <Friends {...this.props} />;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendsContainer);
