import React from "react";
import injectSheet from "react-jss";
import Snippet from "./Snippet";
import SnippetWord from "./SnippetWord";

const Gameboard = props => {
  const { classes, snippetString, client, clientIndex } = props;

  const snippetArray = snippetString.split(" ").map(letter => letter.split(""));

  const transformSnippet = snippetArray => {
    var res = [];
    snippetArray.forEach((word, index) =>
      res.push(<SnippetWord word={word} key={index} wordIndex={index} />)
    );
    return res;
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Snippet
          snippet={transformSnippet(snippetArray)}
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
