import React from "react";
import injectSheet from "react-jss";
import PlayMainSnippet from "./PlayMainSnippet";
import SnippetWord from "./SnippetWord";

const PlayMain = props => {
  const { classes, snippetString } = props;

  const snippetStringToArray = snippetString
    .split(" ")
    .map(letter => letter.split(""));

  const transformSnippet = snippet => {
    //split(/\b(?![\s(.|;|:|,)])/); || RegEX for including spaces

    var res = new Set();

    snippet.forEach((word, index) =>
      res.add(<SnippetWord word={word} key={index} wordIndex={index} />)
    );
    return res;
  };

  const transformedSnippet = transformSnippet(snippetStringToArray);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <PlayMainSnippet snippet={transformedSnippet} />
      </div>
    </div>
  );
};

PlayMain.propTypes = {};

const styles = theme => ({
  container: {
    display: "flex",
    position: "relative",
    margin: "25px 15px 15px 15px",
    height: "auto",
    maxHeight: "375px",
  },
  wrapper: {
    maxHeight: "auto",
    minHeight: "auto",
    width: '100%'
  }
});

export default injectSheet(styles)(PlayMain);
