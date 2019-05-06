import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import Button from "../reusable/Button";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const Navigator = props => {
  const { classes, changeView, state } = props;

  return state === "FEED" ? (
    <div className={classes.container}>
      <h2>All Posts</h2>
      <Button width="124px" height="45px" onClick={() => changeView("NEW_POST")}>
        New Post
      </Button>
    </div>
  ) : (
    <div className={classes.container}>
      <h2>Create Post</h2>
      {/* <div className={classes.cancel}>
        <Button secondary width="124px" height="45px" onClick={() => changeView("FEED")}>
          cancel
        </Button>
      </div> */}
      <div className={classes.cancel}>
        <Button width="124px" height="45px" onClick={() => changeView("NEW_POST")}>
          post
        </Button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "top",
    position: "relative",
    gridArea: "navigator",
    height: "100px",
    "& h2": {
      margin: 0
    }
  },
  cancel: {
    float: "right",
    // position: "relative",
    // top: 0,
    // right: 0
  }
};

Navigator.propTypes = propTypes;

export default withStyles(styles)(Navigator);
