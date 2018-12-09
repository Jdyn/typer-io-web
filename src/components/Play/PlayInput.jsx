import React from "react";
import injectSheet from "react-jss";
import PlayInputPrompt from "./PlayInputPrompt";
  import PlayInputContent from "./PlayInputContent";

const PlayInput = ({ classes, snippet }) => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <PlayInputContent />
      </div>
      <div className={classes.wrapper}>
        <PlayInputPrompt snippet={snippet}/>
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
    margin: "25px 15px 0px 15px",
    backgroundColor: theme.primaryWhite,
    borderRadius: 8,
    boxShadow: "0px 5px 30px 5px rgba(50,50,93,.25)",
    "&:after": {
      content: '""',
      boxShadow: "0 0 35px 45px #fafafa",
      position: "relative",
      top: 40,
      bottom: 40
    }
  },
  wrapper: {
    display: "inline-block",
    width: "50%",
    height: "95px",
    overflow: "hidden"
  }
});

export default injectSheet(styles)(PlayInput);
