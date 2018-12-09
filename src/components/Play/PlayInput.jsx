import React from "react";
import injectSheet from "react-jss";
import PlayInputPrompt from "./PlayInputPrompt";
import PlayInputContent from "./PlayInputContent";

const PlayInput = ({ classes, snippet }) => {
  const focusInput = () => {
    document.getElementById("inputDiv").focus();
  };
  var input = ''
  const inputDidUpdate = (innerText, value) => {
    console.log(value)
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper} onClick={focusInput}>
        <PlayInputContent inputDidUpdate={inputDidUpdate} />
      </div>
      <div className={classes.wrapper} onClick={focusInput}>
        <PlayInputPrompt snippet={snippet} input={input} />
      </div>
    </div>
  );
};

const styles = theme => ({
  container: {
    display: "flex",
    position: "relative",
    overflow: " hidden",
    flexDirection: "row",
    margin: "15px 15px 0px 15px",
    backgroundColor: theme.primaryWhite,
    borderRadius: 8,
    boxShadow: "0px -6px 40px 0px rgba(50,50,93,.25) inset"
    // "&:after": {
    //   content: '""',
    //   boxShadow: "0 0 35px 45px #fafafa",
    //   position: "relative",
    //   top: 40,
    //   bottom: 40
    // }
  },
  wrapper: {
    display: "inline-block",
    width: "50%",
    height: "95px",
    overflow: "hidden"
  }
});

export default injectSheet(styles)(PlayInput);
