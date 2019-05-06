import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import Filter from "../reusable/Filter";
import FeedItem from "./FeedItem";


const propTypes = {
  classes: PropTypes.object.isRequired
};

const Feed = props => {
  const { classes, posts } = props;

  const filters = [
    {
      name: "Popular"
    },
    {
      name: "New"
    },
    {
      name: "followed"
    }
  ];

  return (
    <div className={classes.container}>
      <div className={classes.filter}>
        <Filter filters={filters} padding="0 15px 15px 15px" />
      </div>
      <ul className={classes.feed}>
        {posts.map((post, index) => (
          <FeedItem key={index} post={post} />
        ))}
      </ul>
    </div>
  );
};

const styles = theme => ({
  container: {
    borderRadius: 16,
    minHeight: "765px"
  },
  feed: {
    listStyle: "none",
    margin: 0,
    padding: 0
  }
});

Feed.propTypes = propTypes;

export default withStyles(styles)(Feed);
