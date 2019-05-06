import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import formatTime from "../../lib/formatTime";
import theme from "../../lib/theme";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const FeedItem = props => {
  const { classes, post } = props;

  const created = new Date(post.created_at)

  return (
    <li className={classes.container}>
      <h3>{post.title}</h3>
      <span>
        {formatTime(created)} by {post.user.username}
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
