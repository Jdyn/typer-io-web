import React from "react";
import withStyles from "react-jss";

const InputPrompt = ({ classes, wordsRemaining }) => {
  const filtered = [];
  for (let i = 0; i < 8; i++) {
    filtered.push(wordsRemaining[i]);
  }

  return (
    <div></div>
    // <div className={classes.prompt}>
    //   {filtered.map((word, index) => {
    //     return (
    //       <span key={index} className={classes.word}>
    //         {word}
    //       </span>
    //     );
    //   })}
    // </div>
  );
};

const styles = theme => ({
  prompt: {
    display: "flex",
    justifyContent: "flex-start",
    height: "95%",
    width: "auto",
    lineHeight: "40px",
    alignItems: "center",
    fontSize: "30px",
    whiteSpace: 'nowrap',
    fontWeight: "400",
    color: "#525f7f",//"#0d2b3e",
    transition: "color 0.5s",
    textShadow: "0px 0px .5px rgba(50,50,93,.25)"
  },
  word: {
    lineHeight: "40px",
    padding: "0px 5px",
    opacity: props => (props.gameboard.isStarted ? 1 : 0.4),
    "&:first-child": {
      paddingLeft: "0px !important"
    }
  }
});

export default withStyles(styles)(InputPrompt);
