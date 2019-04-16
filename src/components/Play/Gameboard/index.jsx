import React, { useState, useEffect } from "react";
import withStyles from "react-jss";
import Banner from "../../reusable/Banner";
import Word from "./Word";
import Editor from "./Editor";
import Piece from "./Piece";

const Gameboard = props => {
  const {
    classes,
    gameboard,
    client,
    room,
    gameState,
    editorState,
    setEditorState,
    inputDidUpdate,
    submitWord
  } = props;

  useEffect(() => {
    if (editorState.wrongIndex !== null) {
      if (gameState.currentWord) {
        if (
          gameState.currentInput ===
          gameState.currentWord.substring(0, gameState.currentInput.length)
        ) {
          setEditorState(prev => ({ ...prev, wrongIndex: null }));
        }
      }
    }
  }, [gameState.currentInput]);

  useEffect(() => {
    setEditorState(prev => ({ ...prev, wrongIndex: null }));
  }, [gameState.currentWord]);

  return (
    <div className={classes.container}>
      <Banner>Gameboard</Banner>
      <div className={classes.inner}>
        {gameboard.words.map((word, wordIndex) => (
          <div key={wordIndex} className={classes.wrapper}>
            <Word
              input={gameState.currentInput ? gameState.currentInput.split("") : []}
              currentIndex={gameState.currentIndex}
              word={word}
              index={wordIndex}
              wrongIndex={editorState.wrongIndex}
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
      <Editor
        currentWord={gameState.currentWord}
        gameboard={gameboard}
        isWrong={editorState.wrongIndex !== null}
        input={gameState.currentInput}
        inputDidUpdate={inputDidUpdate}
        submitWord={submitWord}
      />
    </div>
  );
};

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    margin: "0 25px",
    boxShadow: "0px 0px 10px 0px rgba(30,30,73,.3)",
    padding: "24px",
    backgroundColor: theme.white,
    borderRadius: 16,
    gridArea: "gameboard"
  },
  inner: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "flex-start",
    position: "relative",
    height: "325px",
    padding: "25px",
    marginBottom: "15px",
    border: "2px solid #e5e5e5",
    // boxShadow: "0px 0px 5px rgba(30,30,70,.3) inset",
    borderRadius: 16,
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
