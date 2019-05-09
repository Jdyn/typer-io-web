import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import Banner from "../reusable/Banner";
import PostComment from "./PostComment";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const PostComments = props => {
  const { classes, comments, submitComment } = props;

  return comments.map((comment, index) => (
    <PostComment
      submitComment={submitComment}
      key={index}
      comment={comment}
    //   depth={depth}
    />
  ));
};

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    marginTop: "30px",
    padding: "24px",
    borderRadius: 16,
    boxShadow: "0px 10px 15px rgba(30,30,70,.3)",
    backgroundColor: theme.primary,
    minHeight: "400px",
    width: "100%"
  },
  info: {
    height: "75px",
    borderBottom: "2px solid #e5e5e5"
  }
});

PostComments.propTypes = propTypes;

export default withStyles(styles)(PostComments);
