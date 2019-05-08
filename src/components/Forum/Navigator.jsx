import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import Button from "../reusable/Button";
import { Link } from "react-router-dom";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const Navigator = props => {
  const { classes, view, history, isLoggedIn, onClick } = props;

  const renderView = () => ({
    FEED: (
      <>
        <div className={classes.container}>
          <h2>All Posts</h2>
          {isLoggedIn && (
            <Link to="/forum/new">
              <Button width="124px" height="45px">
                New Post
              </Button>
            </Link>
          )}
        </div>
      </>
    ),
    NEW_POST: (
      <div className={classes.container}>
        <h2>New Post</h2>
        <Link to="/forum">
          <Button height="45px">cancel</Button>
        </Link>

        <Button height="45px" margin="0 0 0 10px" onClick={e => onClick(e)}>
          post
        </Button>
      </div>
    ),
    POST: (
      <div className={classes.post}>
        <h2>Post</h2>
        {/*
         * History is used here so we can maintain scroll position when going back to the forum
         */}
        <Button height="45px" onClick={() => history.goBack()}>
          back
        </Button>
      </div>
    )
  });

  return renderView()[view];
};

const styles = {
  container: {
    display: "flex",
    alignItems: "top",
    position: "relative",
    gridArea: "navigator",
    height: "75px",
    "& h2": {
      margin: 0,
      flexGrow: 1
    }
  },
  post: {
    extend: "container",
    borderBottom: "2px solid #e5e5e5"
  }
};

Navigator.propTypes = propTypes;

export default withStyles(styles)(Navigator);
