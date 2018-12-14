import React from "react";
import injectSheet from "react-jss";

const PlayInputPrompt = ({
  classes,
  wordsRemaining,
}) => { 

  return (
    <div className={classes.prompt}>
      {wordsRemaining.map((word, index) => {
        return (
          <span key={index} className={classes.word}>
            {word}
          </span>
        );
      })}
    </div>
  );
};

const styles = {
  prompt: {
    display: "flex",
    justifyContent: "flex-start",
    height: "95%",
    width: "auto",
    alignItems: "center",
    fontSize: "28px",
    fontWeight: "500",
    color: '#0d2b3e'
  },
  word: {
    lineHeight: "40px",
    padding: "0px 5px",
    "&:first-child": {
      paddingLeft: "0px !important"
    }
  }
};

export default injectSheet(styles)(PlayInputPrompt);
