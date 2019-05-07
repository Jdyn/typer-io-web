import React, { Component } from "react";
import { connect } from "react-redux";
import Forum from "../components/Forum";
import { fetchFeed, fetchPost } from "../actions/ForumActions";

class ForumContainer extends Component {
  render() {
    switch (this.props.match.path) {
      case "/forum":
        return <Forum {...this.props} view="FEED" />;
      case "/forum/post/:post_id":
        return <Forum {...this.props} view="POST" />;
      case "/forum/new":
        return <Forum {...this.props} view="NEW_POST" />;
      default:
        return <Forum {...this.props} view="FEED" />;
    }
  }
}

const mapStateToProps = state => ({
  client: state.client.meta,
  feed: state.forum.feed
});

const mapDispatchToProps = dispatch => ({
  fetchFeed: query => dispatch(fetchFeed(query)),
  fetchPost: id => dispatch(fetchPost(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForumContainer);
