import React from "react";
import injectSheet from "react-jss";
import Snippet from "./Snippet";
import SnippetWord from "./SnippetWord";

const Gameboard = props => {
  const { classes, snippet, client, clientIndex } = props;

  const transformSnippet = snippet => {
    var res = [];
    snippet.forEach((word, index) =>
      res.push(
        <SnippetWord
          word={word}
          key={index}
          wordIndex={index}
          clientIndex={clientIndex}
        />
      )
    );
    return res;
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Snippet
          snippet={transformSnippet(snippet)}
          client={client}
          clientIndex={clientIndex}
        />
      </div>
    </div>
  );
};

Gameboard.propTypes = {};

const styles = theme => ({
  container: {
    display: "flex",
    position: "relative",
    margin: "25px 15px 15px 15px",
    height: "auto",
    minHeight: "375px"
  },
  wrapper: {
    maxHeight: "auto",
    minHeight: "auto",
    width: "100%"
  }
});

export default injectSheet(styles)(Gameboard);
