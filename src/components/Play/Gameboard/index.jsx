import React, {useState } from "react";
import withStyles from "react-jss";
import Snippet from "./Snippet";
import SnippetWord from "./SnippetWord";
import Header from "../../reusable/Header";

const Gameboard = props => {
  const { classes, gameboard, client, room, clientIndex } = props;
  const currentClient = room.clients.filter(object => object.id === client.id)[0];

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
      <Header>Gameboard</Header>
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
    margin: "0 30px 15px 30px",
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
