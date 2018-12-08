import React from "react";
import CommonPaper from "../CommonComponents/CommonPaper";
import injectSheet from "react-jss";
import PlayMainSnippet from "./PlayMainSnippet";
import SnippetWord from "./SnippetWord";

const PlayMain = props => {
  const { classes, snippet } = props;

  const transformSnippet = snippet => {
    var words = snippet.split(" ");
    var res = new Set();

    words.forEach((word, index) => {
      console.log(index);
      const letters = word.split("");
      res.add(<SnippetWord letters={letters} key={index} />);
    });
    return [...res];
  };

  const transformedSnippet = transformSnippet(snippet);

  return (
    <div className={classes.container}>
      <CommonPaper>
        <PlayMainSnippet snippet={transformedSnippet} />
      </CommonPaper>
    </div>
  );
};

PlayMain.propTypes = {};

const styles = theme => ({
  container: {
    display: "flex",
    position: "relative",
    margin: "25px 0 auto 0"
  },

});

export default injectSheet(styles)(PlayMain);
