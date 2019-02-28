import React from "react";
import withStyles from "react-jss";
import GamePiece from "./GamePiece";

const Snippet = props => {
  const { classes, client, room, words, gamePieceIndex } = props;

  const currentClient = room.clients.filter(
    object => object.id === client.id
  )[0];

  return (
    client.id &&
    words.map((word, index) => (
      <div className={classes.word} key={index}>
        {word}
        {room.clients
          .filter(object => object.id !== client.id)
          .map((client, index) => {
            const { position, color } = client.gamePiece;
            const { wordIndex } = word.props;
            if (wordIndex === 0 && position === null) {
              return <GamePiece key={index} index={position} color={color} opacity={0.5}/>;
            }
            return wordIndex === position ? (
              <GamePiece
                key={index}
                index={client.gamePiece.position}
                color={client.gamePiece.color}
                opacity={0.5}
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
    ))
  );
};

const styles = {
  word: {
    display: "flex",
    flexFlow: "row",
    position: "relative"
  }
};

export default withStyles(styles)(Snippet);
