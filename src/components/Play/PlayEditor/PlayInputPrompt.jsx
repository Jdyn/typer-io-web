import React from "react";
import injectSheet from "react-jss";

const PlayInputPrompt = ({
  classes,
  wordsRemaining,
}) => { 

  // if (keyPressed === "Backspace") {
  //   var temp = snippetArray[0].split("");
  //   var target = inputText.charAt(inputText.length - 1);
  //   // if (target === snippetArray[0].charAt(0)) {
  //     temp.unshift(target);
  //     // console.log(temp)
  //     snippetArray[0] = temp.join("");
  //   // }
  // }

  // console.log(inputText, keyPressed)
  // console.log(inputText, snippetArray[0].substring(0, inputText.length))


  // console.log(wordsRemaining);

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
