import React from "react";
import injectSheet from "react-jss";

const PlayInputPrompt = ({ classes, snippet, input }) => {
  
  if (input === snippet[0]) {
    console.log("working");
  }

  const currentWordCord = () => {};

  return (
    <div className={classes.prompt}>
      {snippet.map((word, index) => {
        const stringWord = word.join("")
        return (
          <span key={index} className={classes.word}>
            {stringWord}
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
    fontSize: "28px"
  },
  word: {
    lineHeight: '40px',
    padding: "0px 5px",
    '&:first-child': {
      paddingLeft: '0px !important'
    }
  }
};

export default injectSheet(styles)(PlayInputPrompt);
