import React, { useState } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import PostComments from "./PostComments";
import formatTime from "../../lib/formatTime";
import TextBox from "../reusable/TextBox";
import Button from "../reusable/Button";
import ApiService from "../../services/ApiService";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const PostComment = props => {
  const { classes, comment, depth, submitComment } = props;
  const [showReplyBox, set] = useState(false);
  const [form, setForm] = useState({ body: "" });

  const onChange = () => {
    set(prev => !prev);
  };

  const submitReply = event => {
    submitComment(event, comment.id, form);
    set(false)
  };

  return (
    <>
      <div className={classes.container}>
        <h3 className={classes.username}>{comment.user.username}</h3>
        <p className={classes.body}>{comment.body}</p>
        <div className={classes.statusBar}>
          <a className={classes.replyButton} onClick={onChange}>
            reply
          </a>
          <span className={classes.seperator}>•</span>
          <span>{formatTime(comment.created_at)}</span>
        </div>

        {showReplyBox && (
          <div>
            <TextBox
              placeholder="Leave a comment"
              value={form.body}
              onChange={e => setForm({ ...form, body: e.target.value })}
            />
            <Button secondary margin="0 15px 0 0" onClick={onChange}>
              cancel
            </Button>
            <Button onClick={e => submitReply(e)}>post</Button>
          </div>
        )}
      </div>

      <PostComments submitComment={submitComment} comments={comment.comments} depth={depth + 1} />
    </>
  );
};
const styles = theme => ({
  container: props => ({
    borderTop: "2px solid #e5e5e5",
    marginLeft: `${35 * props.depth}px`,
    padding: "8px 35px",
    marginBottom: "15px"
  }),
  username: {
    display: "flex",
    alignItems: "center",
    fontSize: 15,
    color: theme.accent,
    fontWeight: 700,
    margin: 0,
    height: "26px"
  },
  body: {
    margin: 0,
    marginBottom: "15px"
  },
  statusBar: {
    display: "flex",
    alignItems: "center",
    fontWeight: 500,
    paddingTop: "6px",
    paddingLeft: "8px",
    color: theme.secondaryColor,
    height: "30px"
  },
  replyButton: {
    cursor: "pointer",
    fontWeight: 700,
    textTransform: "uppercase",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  seperator: {
    padding: "0 8px"
  }
});

PostComment.propTypes = propTypes;

export default withStyles(styles)(PostComment);
