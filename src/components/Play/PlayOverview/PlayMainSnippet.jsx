import React from "react";
// import PropTypes from "prop-types";
import injectSheet from "react-jss";

const PlayMainSnippet = props => {
  const { classes, snippet } = props;
  return (
    <div className={classes.container}>
      <div className={classes.inner}>{snippet.map(element => element)}</div>
    </div>
  );
};

PlayMainSnippet.propTypes = {};

const styles = theme => ({
  container: {
    display: "inline-block",
    position: "relative",
    backgroundColor: theme.primaryWhite,
    paddingLeft: "25px",
    height: "100%",
    width: "100%",  
    borderRadius: 8,
    boxShadow: "0px 6px 40px 0px rgba(50,50,93,.25) inset",
    overflow: "hidden"
  },
  inner: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    position: "relative",
    boxSizing: "content-box",
    width: "100%",
    height: "100%",
    overflow: "auto",
    padding: "25px 25px 0px 0px"
  }
});

export default injectSheet(styles)(PlayMainSnippet);
