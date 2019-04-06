import React, { useState, useEffect } from "react";
import withStyles from "react-jss";
import Banner from "../../reusable/Banner";
import Word from "./Word";
import Piece from "./Piece";

const Gameboard = props => {
  const { classes, gameboard, client, room, state, wrongIndex, setEditorState } = props;

  useEffect(() => {
    if (wrongIndex !== null) {
      if (state.currentWord) {
        if (state.currentInput === state.currentWord.substring(0, state.currentInput.length)) {
          setEditorState(prev => ({ ...prev, wrongIndex: null }));
        }
      }
    }
  }, [state.currentInput]);

  useEffect(() => {
    setEditorState(prev => ({ ...prev, wrongIndex: null }));
  }, [state.currentWord]);

  return (
    <div className={classes.container}>
      <Banner>Gameboard</Banner>
      <div className={classes.inner}>
        {gameboard.words.map((word, wordIndex) => (
          <div key={wordIndex} className={classes.wrapper}>
            <Word
              input={state.currentInput ? state.currentInput.split("") : []}
              currentIndex={state.currentIndex}
              word={word}
              index={wordIndex}
              wrongIndex={wrongIndex}
              setEditorState={setEditorState}
            />
            {room.clients
              .filter(object => object.id !== client.id)
              .map((client, pieceIndex) => {
                const { position, color } = client.gamePiece;

                if (wordIndex === 0 && position === null)
                  return <Piece key={pieceIndex} color={color} position={position} />;

                return position === wordIndex ? (
                  <Piece key={pieceIndex} color={color} position={position} />
                ) : null;
              })}
          </div>
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
    margin: "0 20px 15px 20px",
    gridArea: "gameboard"
  },
  inner: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "flex-start",
    zIndex: 100,
    backgroundColor: theme.white,
    position: "relative",
    height: "350px",
    maxHeight: "325px",
    padding: "20px",
    fontWeight: 400,
    border: "2px solid rgb(0,0,0,.1)",
    borderTop: "none",
    borderRadius: "0 0 10px 10px",
    boxShadow: "0px 5px 15px 0px rgba(30,30,73,.3) inset",
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
  },
  wrapper: {
    display: "flex",
    flexFlow: "row",
    position: "relative",
    alignItems: "center"
  }
});

export default withStyles(styles)(Gameboard);
