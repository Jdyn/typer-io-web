import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import Feed from "./Feed";
import Navigator from "./Navigator";
import Banner from "../reusable/Banner";
import PostForm from "./PostForm";
import Post from "./Post";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const Forum = props => {
  const { classes, fetchFeed, feed, fetchPost, view, match } = props;

  const renderView = () => ({
    FEED: (
      <div className={classes.container}>
        <Feed posts={feed.posts} fetchFeed={fetchFeed} view={view} />
      </div>
    ),
    NEW_POST: (
      <div className={classes.container}>
        <PostForm view={view} />
      </div>
    ),
    POST: (
      <div className={classes.container}>
        <Post view={view} match={match} fetchPost={fetchPost} />
      </div>
    )
  });

  return (
    <>
      <div className={classes.stripe} />
      <div className={classes.root}>
        {renderView()[view]}
        <div className={classes.messages} style={{ height: "425px" }}>
          <Banner>Messages</Banner>
        </div>
        <input className={classes.search} placeholder="Search" />
        <div className={classes.subjects} style={{ height: "425px" }}>
          <Banner>Subjects</Banner>
        </div>
      </div>
    </>
  );
};

const styles = theme => ({
  root: {
    display: "grid",
    position: "relative",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "1fr 1fr 1fr",
    margin: "135px auto 30px auto",
    maxWidth: "350px",
    padding: "15px",
    zIndex: 100,
    // gridTemplateAreas: `

    //     `,
    "@media (min-width: 1000px)": {
      gridTemplateColumns: "1fr 535px 1fr",
      gridTemplateRows: "min-content 1fr",
      maxWidth: "1125px",
      gridTemplateAreas: `
            ' messages main search'
            'messages main subjects'
            `
    }
  },
  search: {
    diplay: "flex",
    flexGrow: 1,
    gridArea: "search",
    backgroundColor: "#f7f7f7",
    border: "2px solid #e5e5e5",
    borderRadius: 16,
    fontSize: "17px",
    padding: "12px 12px 12px 50px",
    boxShadow: "0px 3px 10px rgba(30,30,70,.3)",
    overflow: "hidden",
    height: "55px",
    margin: "0 0 20px 15px"
  },
  container: {
    gridArea: "main",
    display: "flex"
    // padding: "24px",
    // borderRadius: 16,
    // boxShadow: "0px 10px 15px rgba(30,30,70,.3)",
    // backgroundColor: theme.primary,
    // flexBasis: "765px"
  },
  messages: {
    display: "flex",
    flexDirection: "column",
    gridArea: "messages",
    padding: "24px",
    backgroundColor: theme.primary,
    boxShadow: "0px 10px 15px rgba(30,30,70,.3)",
    borderRadius: 16,
    margin: "0 15px 0 0"
  },
  subjects: {
    display: "flex",
    flexDirection: "column",
    gridArea: "subjects",
    padding: "24px",
    backgroundColor: theme.primary,
    boxShadow: "0px 10px 15px rgba(30,30,70,.3)",
    borderRadius: 16,
    margin: "0 0 0 15px"
  },
  stripe: {
    zIndex: 0,
    width: "100%",
    height: "95%",
    top: 0,
    overflow: "hidden",
    WebkitTransform: "skwY(-12deg)",
    transform: "skewY(-12deg)",
    WebkitTransformOrigin: 0,
    transformOrigin: 0,
    backgroundColor: theme.tertiary,
    position: "absolute"
  }
});

Forum.propTypes = propTypes;

export default withStyles(styles)(Forum);
