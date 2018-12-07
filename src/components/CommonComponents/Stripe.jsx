import React from "react";
import injectSheet from "react-jss";

const Stripe = props => {
  const { classes } = props;
  return <div classname={classes.stripe} />;
};

const styles = theme => ({
  stripe: {
    zIndex: 0,
    width: "100%",
    height: "85%",
    overflow: "hidden",
    WebkitTransform: "skwY(-12deg)",
    transform: "skewY(-12deg)",
    WebkitTransformOrigin: 0,
    transformOrigin: 0,
    backgroundColor: 'black',
    position: "absolute"
  }
});

export default injectSheet(styles)(Stripe);
