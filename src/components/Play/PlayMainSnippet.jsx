import React from "react";
// import PropTypes from "prop-types";
import injectSheet from "react-jss";

const PlayMainSnippet = props => {
  const { classes, snippet } = props;
  return <div className={classes.container}>{snippet}</div>;
};

PlayMainSnippet.propTypes = {};

const styles = theme => ({
  container: {
    display: "flex",
    backgroundColor: theme.secondaryWhite,
    padding: "25px",
    margin: "25px 45px 25px 45px",
    borderRadius: 8,
    minWidth: "675px"
  }
});

export default injectSheet(styles)(PlayMainSnippet);
