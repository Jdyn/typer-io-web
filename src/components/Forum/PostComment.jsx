import React, { useState } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import PostComments from "./PostComments";
import formatTime from "../../lib/formatTime";
import TextBox from "../reusable/TextBox";
import Button from "../reusable/Button";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const PostComment = props => {
  const { classes, comment, submitComment, isLoggedIn } = props;
  const [showReplyBox, set] = useState(false);
  const [form, setForm] = useState({ body: "" });

  const onChange = () => {
    set(prev => !prev);
  };

  const submitReply = event => {
    submitComment(event, comment.id, form, setForm);
    set(false);
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <div className={classes.portrait} />

          <div className={classes.content}>
            <h3 className={classes.username}>{comment.user.username}</h3>
            <p className={classes.body}>{comment.body}</p>
          </div>
        </div>

        <div className={classes.statusBar}>
          {comment.replyable && isLoggedIn ? (
            <button className={classes.replyButton} onClick={onChange}>
              reply
            </button>
          ) : (
            <button className={classes.replyButton} />
          )}
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

      <PostComments submitComment={submitComment} comments={comment.comments} isLoggedIn={isLoggedIn} />
    </>
  );
};
const styles = theme => ({
  container: props => ({
    display: "flex",
    flexDirection: "column",
    position: "relative",
    borderTop: "2px solid #e5e5e5",
    marginLeft: `${60 * props.comment.depth}px`,
    padding: "20px 0 10px 60px",
    minHeight: "125px"
  }),
  wrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    wordWrap: "break-word",
    marginLeft: "15px"
  },
  username: {
    display: "flex",
    alignItems: "center",
    fontSize: 15,
    color: theme.accent,
    fontWeight: 700,
    margin: 0
  },
  content: {
    flexWrap: "wrap"
  },
  body: { 
    display: "flex",
    overflowWrap: "break-word",
    wordBreak: "break-word",
    margin: 0,
    fontSize: 16,
    marginBottom: "15px"
  },
  statusBar: {
    display: "flex",
    alignItems: "center",
    fontWeight: 500,
    marginLeft: "15px",
    paddingTop: "6px",
    fontSize: 16,
    color: theme.secondaryColor,
    height: "30px"
  },
  replyButton: {
    cursor: "pointer",
    fontWeight: 700,
    width: "50px",
    border: "none",
    outline: "none",
    color: theme.secondaryColor,
    textTransform: "uppercase",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  seperator: {
    padding: "0 8px"
  },
  portrait: {
    position: "absolute",
    top: "15px",
    left: 0,
    width: "60px",
    height: "60px",
    // marginLeft: "-60px",
    borderRadius: "50%",
    border: "3px solid #e5e5e5"
  }
});

PostComment.propTypes = propTypes;

export default withStyles(styles)(PostComment);
