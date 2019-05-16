import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import PostComment from "./PostComment";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const PostComments = props => {
  const { comments, submitComment, isLoggedIn } = props;

  return comments.map((comment, index) => (
    <PostComment submitComment={submitComment} key={index} isLoggedIn={isLoggedIn} comment={comment} />
  ));
};

const styles = theme => ({});

PostComments.propTypes = propTypes;

export default withStyles(styles)(PostComments);
