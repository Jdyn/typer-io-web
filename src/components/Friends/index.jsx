import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const Friends = props => {
  const { classes } = props;
  return (
    <main>
      <div className={classes.stripe} />
    </main>
  );
};

const styles = theme => ({
  stripe: {
    zIndex: 0,
    width: "100%",
    height: "95%",
    overflow: "hidden",
    WebkitTransform: "skwY(-12deg)",
    transform: "skewY(-12deg)",
    WebkitTransformOrigin: 0,
    transformOrigin: 0,
    backgroundColor: theme.tertiaryWhite,
    position: "absolute"
  }
});

Friends.propTypes = propTypes;

export default withStyles(styles)(Friends);
