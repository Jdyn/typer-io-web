import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import formatTime from "../../lib/formatTime";
import { Link } from "react-router-dom";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const FeedItem = props => {
  const { classes, post } = props;

  return (
    <li className={classes.container}>
      <div className={classes.portrait} />
      <div className={classes.wrapper}>
        <Link className={classes.titleLink} to={`/forum/post/${post.id}`}>
          {post.title}
        </Link>
        <span>
          {formatTime(post.created_at)} by {post.user.username}
        </span>
        <Link className={classes.commentLink} to={`/forum/post/${post.id}`}>
          {post.comment_count} comment{post.comment_count === 1 ? "" : "s"}
        </Link>
      </div>
    </li>
  );
};

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "row",
    position: "relative",
    minHeight: "110px",
    borderBottom: "2px solid #e5e5e5",
    padding: "20px 0 20px 60px"
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "15px",
    "& span": {
      color: theme.secondaryColor,
      fontSize: 16
    },
  },
  titleLink: {
    fontWeight: 700,
    fontSize: 20,
    margin: 0,
    color: theme.color,
    textDecoration: "none",
    overflowWrap: "break-word",
    wordWrap: "break-word",
  },
  commentLink: {
    color: theme.secondaryColor,
    marginTop: "auto",
    fontSize: 16
  },
  portrait: {
    position: "absolute",
    top: "20px",
    left: 0,
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    border: "3px solid #e5e5e5"
  }
});

FeedItem.propTypes = propTypes;

export default withStyles(styles)(FeedItem);
