import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import Button from "../reusable/Button";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const Navigator = props => {
  const { classes } = props;

  return (
    <div className={classes.container}>
      <h2>All Posts</h2>
      <Button width="124px" height="45px" margin="0 0 0 auto">
        New Post
      </Button>
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
  }
};

Navigator.propTypes = propTypes;

export default withStyles(styles)(Navigator);
