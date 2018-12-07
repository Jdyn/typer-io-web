import React from "react";
// import PropTypes from "prop-types";
import CommonPaper from "../CommonComponents/CommonPaper";
import injectSheet from "react-jss";
import PlayMainSnippet from "./PlayMainSnippet";
import SnippetWord from "./SnippetWord";

const PlayMain = props => {
  const { classes } = props;

  const snippet = "They show salary data points that can be a few years old. Also it's not really clear how they break up non-salary compensation (bonuses, stock, 401k contributions, etc), from my recollection."

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
    position: 'relative',
    backgroundColor: theme.primaryWhite,
    margin: "25px auto 0px auto"
  }
});

export default injectSheet(styles)(PlayMain);
