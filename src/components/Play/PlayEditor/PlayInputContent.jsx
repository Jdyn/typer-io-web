import React from "react";
import injectSheet from "react-jss";
import PlayInputEditor from "./PlayInputEditor";

const PlayInputContent = ({ classes, inputDidUpdate, snippetArray }) => {
  return (
    <div className={classes.prompt}>
      <PlayInputEditor inputDidUpdate={inputDidUpdate}/> 
    </div>
  );
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
