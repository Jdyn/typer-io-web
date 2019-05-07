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
    console.log("log")
  };

  return (
    <li className={classes.container}>
      <Link to={`/forum/post/${post.id}`}>
        <h3>{post.title}</h3>
      </Link>

      <span>
        {formatTime(post.created_at)} by {post.user.username}
      </span>
    </li>
  );
};

const styles = theme => ({
  container: {
    // display: "flex",
    position: "relative",
    height: "105px",
    borderBottom: "2px solid #e5e5e5",
    padding: "25px 0 25px 80px",
    "& h3": {
      fontSize: 17,
      margin: 0,
      color: theme.color
    },
    "& span": {
      color: theme.secondaryColor
    }
  }
});

FeedItem.propTypes = propTypes;

export default withStyles(styles)(FeedItem);
