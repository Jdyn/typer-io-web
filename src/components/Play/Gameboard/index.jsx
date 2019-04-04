import React, { useState, useEffect } from "react";
import withStyles from "react-jss";
import Header from "../../reusable/Header";
import Word from "./Word";
import Piece from "./Piece";

const Gameboard = props => {
  const { classes, gameboard, client, room, state } = props;

  const [wrongIndex, setWrongIndex] = useState(null);

  useEffect(() => {
    if (state.currentWord) {
      if (state.input === state.currentWord.substring(0, state.input.length)) {
        if (wrongIndex !== null) {
          setWrongIndex(null);
        }
      }
    }
  }, [state.input]);

  useEffect(() => {
    setWrongIndex(null);
  }, [state.currentWord]);

  return (
    <div className={classes.container}>
      <Header>Gameboard</Header>
      <div className={classes.inner}>
        {gameboard.words.map((word, wordIndex) => (
          <div key={wordIndex} className={classes.wrapper}>
            <Word
              input={state.input ? state.input.split("") : []}
              currentIndex={state.currentIndex}
              word={word}
              index={wordIndex}
              wrongIndex={wrongIndex}
              setWrongIndex={setWrongIndex}
            />
            {room.clients.map((client, pieceIndex) => {
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
    margin: "0 15px 15px 15px",
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
    height: "325px",
    maxHeight: "325px",
    padding: "20px",
    fontWeight: 400,
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
  },
  wrapper: {
    display: "flex",
    flexFlow: "row",
    position: "relative",
    alignItems: "center"
  }
});

export default withStyles(styles)(Gameboard);
