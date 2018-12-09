import React from "react";
import CommonPaper from "../CommonComponents/CommonPaper";
import injectSheet from "react-jss";
import PlayMainSnippet from "./PlayMainSnippet";
import SnippetWord from "./SnippetWord";
import PlayInput from "./PlayInput";

const PlayMain = props => {
  const { classes, snippet } = props;

  const transformSnippet = snippet => {
    var res = new Set();

    snippet.forEach((word, index) =>
      res.add(<SnippetWord word={word} key={index} wordIndex={index}/>)
    );
    //split(/\b(?![\s(.|;|:|,)])/); || RegEX for including spaces
    return [...res];
  };

  const transformedSnippet = transformSnippet(snippet);

  return (
    <div className={classes.container}>
      <PlayMainSnippet snippet={transformedSnippet} />
    </div>
  );
};

PlayMain.propTypes = {};

const styles = theme => ({
  container: {
    display: "flex",
    position: "relative",
    margin: "25px 15px 15px 15px",
    height: "375px" // 375px was standard. Changing to 300px to debug.
  }
});

export default injectSheet(styles)(PlayMain);
