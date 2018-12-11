import React from "react";
import injectSheet from "react-jss";

const PlayInputPrompt = ({ classes, snippetArray, input }) => {
  const originalString = snippetArray[0];

  for (const letter of snippetArray[0]) {
    console.log(letter + "is at position " + index);
  }

  snippetArray[0] = snippetArray[0].slice(1);

  return (
    <div className={classes.prompt}>
      {snippetArray.map((word, index) => {
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
    fontSize: "28px"
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
