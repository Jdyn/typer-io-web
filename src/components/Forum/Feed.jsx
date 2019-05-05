import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import Banner from "../reusable/Banner";
import Navigator from "./Navigator";
import Filter from "../reusable/Filter";
import FeedItem from "./FeedItem";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const Feed = props => {
  const { classes } = props;

  const posts = [
    {
      name: "post"
    },
    {
      name: "post"
    },
    {
      name: "post"
    },
    {
      name: "post"
    },
    {
      name: "post"
    }
  ];

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
      <Banner>Forum</Banner>
      <Navigator />
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
    gridArea: "feed",
    padding: "24px",
    borderRadius: 16,
    boxShadow: "0px 10px 15px rgba(30,30,70,.3)",
    backgroundColor: theme.primary,
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
