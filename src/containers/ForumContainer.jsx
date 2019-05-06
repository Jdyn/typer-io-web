import React, { Component } from "react";
import { connect } from "react-redux";
import Forum from "../components/Forum";
import { fetchFeed } from "../actions/ForumActions";

class ForumContainer extends Component {
  render() {
    return <Forum {...this.props} />;
  }
}

const mapStateToProps = state => ({
  client: state.client.meta,
  feed: state.forum.feed
});

const mapDispatchToProps = dispatch => ({
  fetchFeed: query => dispatch(fetchFeed(query))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForumContainer);
