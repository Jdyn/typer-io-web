import React, { useState } from "react";
import withStyles from "react-jss";
import Header from "../../reusable/Header";
import Word from "./Word";

const Gameboard = props => {
  const { classes, gameboard, client, room, state, setState } = props;

  return (
    <div className={classes.container}>
      <Header>Gameboard</Header>
      <div className={classes.inner}>
        {gameboard.words.map((word, index) => (
          <Word
            key={index}
            {...state}
            word={word}
            index={index}
            isHidden={index > state.currentIndex + 12}
            isComplete={index < state.currentIndex}
          />
        ))}
      </div>
    </div>
  );
};

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    margin: "0 15px 15px 15px",
    gridArea: "gameboard"
  },
  inner: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "flex-start",
    zIndex: 150,
    backgroundColor: theme.white,
    position: "relative",
    height: "325px",
    maxHeight: "325px",
    padding: "20px",
    borderRadius: "0 0 10px 10px",
    boxShadow: "0px 5px 25px -2px rgba(50,50,93,.3) inset",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "10px",
      height: "16px"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,0.2)"
    },
    "&::-webkit-scrollbar-button": {
      width: "0",
      height: "0",
      display: "none"
    }
  }
});

export default withStyles(styles, { injectTheme: true })(Gameboard);
