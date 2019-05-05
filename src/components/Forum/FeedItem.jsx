import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const FeedItem = props => {
  const { classes, post } = props;

  return <li className={classes.container}>{post.name}</li>;
};

const styles = {
  container: {
    display: "flex",
    position: "relative",
    height: "105px",
    borderBottom: "2px solid #e5e5e5",
    padding: "25px 25px 25px 80px"
  }
};

FeedItem.propTypes = propTypes;

export default withStyles(styles)(FeedItem);
