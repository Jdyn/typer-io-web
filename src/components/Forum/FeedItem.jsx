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

  const handleClick = () => {
    console.log("log");
  };

  console.log(post);

  return (
    <li className={classes.container}>
      <div className={classes.wrapper}>
        <h3>
          <Link to={`/forum/post/${post.id}`}>{post.title}</Link>
        </h3>

        <span>
          {formatTime(post.created_at)} by {post.user.username}
        </span>
      </div>
      <span>
        <Link to={`/forum/post/${post.id}`}>{post.comment_count} comments</Link>
      </span>
    </li>
  );
};

const styles = theme => ({
  container: {
    position: "relative",
    height: "115px",
    borderBottom: "2px solid #e5e5e5",
    padding: "20px 0 20px 80px",
    "& span": {
      display: "flex",
      color: theme.secondaryColor,
      marginTop: "5px"
    },
    "& a": {
      // textDecoration: "none",
      color: theme.secondaryColor,
    }
  },
  wrapper: {
    "& h3": {
      fontSize: 17,
      margin: 0,
      color: theme.color,
      textDecoration: "none"
    },
    "& a": {
      textDecoration: "none",
      color: theme.color
    },
    "& span": {
      display: "flex",
      margin: 0,
      color: theme.secondaryColor
    }
  }
});

FeedItem.propTypes = propTypes;

export default withStyles(styles)(FeedItem);
