import React from "react";
import injectSheet from "react-jss";
import PlayInputEditor from "./PlayInputEditor";

const PlayInputContent = ({ classes, inputDidUpdate, wordsComplete, inputIsWrong }) => {

  return (
    <div className={classes.content}>
      {wordsComplete.map((word, index) => {
        return (
          <span key={index} className={classes.word}>
            {word}
          </span>
        ); 
      })}
      <PlayInputEditor inputDidUpdate={inputDidUpdate} inputIsWrong={inputIsWrong}/>
    </div>
  );
};

const styles = {
  content: {
    display: "flex",
    justifyContent: "flex-end",
    height: "95%",
    width: "auto",
    alignItems: "center",
    fontSize: "28px",
    fontWeight: "500",
    color: '#24b47e'
  },
  word: {
    lineHeight: "40px",
    padding: "0px 5px",
    "&:first-child": {
      paddingLeft: "0px !important"
    }
  }
};

export default injectSheet(styles)(PlayInputContent);
