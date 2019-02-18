import React from "react";
import withStyles from "react-jss";
import Snippet from "./Snippet";
import SnippetWord from "./SnippetWord";
import Header from "../../Common/Header";

const Gameboard = props => {
  const { classes, gameboard, client, room, clientIndex, theme } = props;

  const currentClient = room.clients.filter(
    object => object.id === client.id
  )[0];

  const transform = words => {
    var res = [];
    words.forEach((word, index) =>
      res.push(
        <SnippetWord
          key={index}
          word={word}
          wordIndex={index}
          isComplete={currentClient.gamePiece.isComplete || gameboard.isOver}
        />
      )
    );
    return res;
  };

  return (
    <div className={classes.container}>
      <Header
        color={theme.primaryWhite}
        boxShadow="0 5px 20px rgba(35,35,80,.25)"
        borderRadius="8px 8px 0px 0px"
        margin="0px 0px -8px 0px"
        fontSize={24}
        height="55px"
        backgroundColor={"#555abf"}
        padding="10px 10px 10px 10px"
      >
        Gameboard
      </Header>
      <div className={classes.inner}>
        <Snippet
          words={transform(gameboard.words)}
          room={room}
          gamePieceIndex={clientIndex}
          client={client}
        />
      </div>
    </div>
  );
};

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    margin: "0px 10px 10px 10px",
    gridRow: "2 / 4",
    gridColumn: "2 / 3"
  },
  inner: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.primaryWhite,
    zIndex: 150,
    position: "relative",
    borderRadius: 8,
    boxShadow: "0px 5px 25px 0px rgba(50,50,93,.25) inset"
  }
});

export default withStyles(styles, { injectTheme: true })(Gameboard);
