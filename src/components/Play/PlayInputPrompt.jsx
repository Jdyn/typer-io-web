import React from "react";
import injectSheet from "react-jss";

const PlayInputPrompt = ({ classes, snippet }) => {
  return (
    <div className={classes.prompt}>
      {snippet.map(word => <span className={classes.word}>{word}</span>)}
    </div>
  );
};
  
const styles = {
  prompt: {
    display: "flex",
    justifyContent: "flex-start",
    height: "95%",
    width: "10000px",
    alignItems: "center",
    fontSize: "28px"
  },
  word: {
    margin: '0px 8px 0px 0px'
  }
};

export default injectSheet(styles)(PlayInputPrompt);
