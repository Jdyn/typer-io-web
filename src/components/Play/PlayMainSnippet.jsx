import React from "react";
// import PropTypes from "prop-types";
import injectSheet from "react-jss";

const PlayMainSnippet = props => {
  const { classes, snippet } = props;
  return (
    <div className={classes.container}>
    
    {snippet.map(element => element)}
    
    
    </div>
  );
};

PlayMainSnippet.propTypes = {};

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    position: "relative",
    backgroundColor: theme.secondaryWhite,
    padding: "25px",
    height: '375px',
    margin: "25px 25px 25px 25px",
    borderRadius: 8,
    boxShadow: "0px 5px 40px 5px rgba(50,50,93,.25) inset",
    overflow: "auto"
  },
  inner: {
    // display: "flex",
    // flexDirection: "row",
    // flexWrap: "wrap",
    // position: 'relative',
    // width: "100%",
    // height: "100%",
    // overflow: "auto",
    // paddingRight: 15
  }
});

export default injectSheet(styles)(PlayMainSnippet);
