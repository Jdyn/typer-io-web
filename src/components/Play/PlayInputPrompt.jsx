import React from "react";
import injectSheet from "react-jss";

const PlayInputPrompt = ({ classes, snippet }) => {
  return (
    <div className={classes.prompt}>
    {snippet}
    </div>
  );
};

const styles = {
  prompt: {
    display: 'flex',
    justifyContent: "flex-start",
    alignItems: "center",
    height: '95%',
    width: '10000px',
    alignItems: 'center',
    fontSize: '28px'
  }
};

export default injectSheet(styles)(PlayInputPrompt);
