import React from "react";
import withStyles from "react-jss";
import Snippet from "./Snippet";
import SnippetWord from "./SnippetWord";
import Header from "../../reusable/Header";

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
        border="1px solid rgba(0,0,0,.1)"
        margin="0px 0px -8px 0px"
        fontSize={24}
        height="60px"
        backgroundColor="#555abf"
        padding="10px 10px 0px 10px"
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
    margin: 0,//"0px 10px 10px 10px",
    gridRow: "2 / 4",
    gridColumn: "2 / 3"
  },
  inner: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "flex-start",
    zIndex: 150,
    backgroundColor: theme.primaryWhite,
    position: "relative",
    height: "325px",
    maxHeight: "325px",
    padding: "20px",
    borderRadius: 8,
    boxShadow: "0px 5px 25px 0px rgba(50,50,93,.25) inset",
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
