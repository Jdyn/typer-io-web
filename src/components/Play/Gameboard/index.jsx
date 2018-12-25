import React from "react";
import injectSheet from "react-jss";
import Snippet from "./Snippet";
import SnippetWord from "./SnippetWord";

const Gameboard = props => {
  const { classes, snippetString } = props;

  const snippetArray = snippetString.split(" ").map(letter => letter.split(""));

  const transformSnippet = snippetArray => {
    var res = new Set();

    snippetArray.forEach((word, index) =>
      res.add(<SnippetWord word={word} key={index} wordIndex={index} />)
    );
    return res;
  };

  const transformedSnippet = transformSnippet(snippetArray);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Snippet snippet={transformedSnippet} />
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
    maxHeight: "375px",
    minHeight: "375px",
    minWidth: "575px"
  },
  wrapper: {
    maxHeight: "auto",
    minHeight: "auto",
    width: "100%"
  }
});

export default injectSheet(styles)(Gameboard);
