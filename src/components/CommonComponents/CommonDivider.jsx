import React from "react";
import injectSheet from "react-jss";

const CommonDivider = props => {
  const { classes, children } = props;

  return <div className={classes.divider}>{children}</div>;
};

const styles = theme => ({
  divider: {
    height: "1px",
    margin: 0,
    border: "none",
    flexShrink: 0,
    backgroundColor: theme.divider
  }
});

export default injectSheet(styles)(CommonDivider);
