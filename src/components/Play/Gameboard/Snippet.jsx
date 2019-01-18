import React from "react";
import injectSheet from "react-jss";
import GamePiece from "./GamePiece";

const Snippet = props => {
  const { classes, client, room, words, gamePieceIndex } = props;

  const currentClient = room.clients.filter(
    object => object.id === client.id
  )[0];

  return (
    <div className={classes.container}>
      {client.id && (
        <div className={classes.inner}>
          {words.map((word, index) => (
            <div className={classes.word} key={index}>
              {word}
              {room.clients
                .filter(object => object.id !== client.id)
                .map((client, index) => {
                  const { currentIndex, color } = client.gamePiece;
                  const { wordIndex } = word.props;
                  if (
                    wordIndex === 0 &&
                    currentIndex === null
                  ) {
                    return (
                      <GamePiece
                        key={index}
                        index={currentIndex}
                        color={color}
                      />
                    );
                  }
                  return wordIndex ===
                    currentIndex ? (
                      <GamePiece
                        key={index}
                        index={client.gamePiece.currentIndex}
                        color={client.gamePiece.color}
                      />
                    ) : null;
                })}

              {word.props.wordIndex === 0 && gamePieceIndex === null && (
                <GamePiece
                  index={gamePieceIndex}
                  color={currentClient.gamePiece.color}
                />
              )}

              {word.props.wordIndex === gamePieceIndex && (
                <GamePiece
                  index={gamePieceIndex}
                  color={currentClient.gamePiece.color}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = theme => ({
  container: {
    display: "inline-block",
    position: "absolute",
    backgroundColor: theme.primaryWhite,
    padding: " 0px 20px 0px 15px",
    height: "100%",
    width: "100%",
    borderRadius: 8,
    boxShadow: "0px 6px 40px 0px rgba(50,50,93,.25) inset",
    overflow: "hidden"
  },
  inner: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    position: "relative",
    boxSizing: "content-box",
    width: "100%",
    height: "95%",
    overflow: "auto",
    alignContent: "flex-start",
    // justifyContent: "space-around",
    padding: "15px 40px 15px 0px"
  },
  word: {
    display: "flex",
    flexFlow: "row",
    position: "relative"
  }
});

export default injectSheet(styles)(Snippet);
