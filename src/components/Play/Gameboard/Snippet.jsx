import React from "react";
import withStyles from "react-jss";
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
    position: "relative",
    height: "375px",
    paddingLeft: "20px",
    maxWidth: "100%",
    overflow: "hidden",
    zIndex: 20,
    margin: "0px 30px 0px 10px"
  },
  inner: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "flex-start",
    position: "absolute",
    padding: "20px 0px 20px 0px",
    zIndex: 20,
    width: "100%",
    height: "100%",
    borderBox: "content-box",
    overflowY: "scroll",
    overflowX: "hidden"
  },
  word: {
    display: "flex",
    flexFlow: "row",
    position: "relative"
  }
});

export default withStyles(styles)(Snippet);
