import React from "react";
import injectSheet from "react-jss";
import Snippet from "./Snippet";
import SnippetWord from "./SnippetWord";

const Gameboard = props => {
  const { classes, gameboard, client, room } = props;

  const transform = words => {
    var res = [];
    words.forEach((word, index) =>
      res.push(
        <SnippetWord
          key={index}
          word={word}
          wordIndex={index}
        />
      )
    );
    return res;
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Snippet
          words={transform(gameboard.words)}
          room={room}
          clientIndex={gameboard.clientIndex}
          client={client}
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    position: "relative",
    margin: "25px 15px 15px 15px",
    height: "auto",
    minWidth: "450px",
    maxWidth: "650px",
    minHeight: "375px"
  },
  wrapper: {
    maxHeight: "auto",
    minHeight: "auto",
    width: "100%"
  }
}

export default injectSheet(styles)(Gameboard);
