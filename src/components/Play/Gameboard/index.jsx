import React, { useEffect } from "react";
import withStyles from "react-jss";
import Banner from "../../reusable/Banner";
import Word from "./Word";
import Piece from "./Piece";

const Gameboard = props => {
  const {
    classes,
    gameboard,
    client,
    room,
    gameState,
    editorState,
    setEditorState
  } = props;

  useEffect(() => {
    if (gameState.currentInput.length > gameState.currentWord.length) {
      setEditorState(prev => ({
        ...prev,
        wrongIndex: -1
      }));
    }

    if (editorState.wrongIndex !== null) {
      if (gameState.currentWord) {
        if (
          gameState.currentInput ===
          gameState.currentWord.substring(0, gameState.currentInput.length)
        ) {
          setEditorState(prev => ({
            ...prev,
            wrongIndex: null,
            errors: prev.errors + 1
          }));
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
              input={
                gameState.currentInput ? gameState.currentInput.split("") : []
              }
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
                  return (
                    <Piece key={pieceIndex} color={color} position={position} />
                  );

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
    height: "410px",
    maxHeight: "410px",
    position: "relative",
    margin: "0 15px",
    marginBottom: "15px",
    padding: "20px",
    backgroundColor: theme.white,
    borderRadius: 16,
    gridArea: "gameboard",
    "&:before": {
      top: 0,
      left: 0,
      zIndex: -1,
      content: "''",
      position: "absolute",
      borderRadius: 16,
      boxShadow: "0px 10px 15px rgba(30,30,70,.3)",
      width: "100%",
      height: "100%"
    }
  },
  inner: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    flexGrow: 1,
    alignContent: "flex-start",
    position: "relative",
    padding: "20px",
    border: "2px solid #e5e5e5",
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
