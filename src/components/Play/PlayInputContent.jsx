import React from "react";
import injectSheet from "react-jss";

const PlayInputContent = ({ classes }) => {
  return <div className={classes.prompt}>0</div>;
};

const styles = {
  prompt: {
    display: "flex",
    height: "95%",
    minWidth: "100%",
    justifyContent: "flex-end",
    alignItems: "center"
  }
};

export default injectSheet(styles)(PlayInputContent);
