import React from "react";
import injectSheet from "react-jss";

const PlayMainSnippet = props => {
  const { classes, snippet } = props;

  return (
    <div className={classes.container}>
      <div className={classes.inner}>
        {[...snippet].map(SnippetWord => SnippetWord)}
      </div>
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
    height: "95%",
    overflow: "auto",
    padding: "11px 25px 11px 0px",

  }
});

export default injectSheet(styles)(PlayMainSnippet);
